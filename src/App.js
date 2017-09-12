import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import qs from 'query-string';
import './App.css';
import {findById, noopTrue} from './utils';
import {Header} from './components/Header';
import {ProductGrid} from './components/ProductGrid';
import {Sidebar} from './components/Sidebar';
import {ProductDetailsModal} from './components/ProductDetailsModal';
import {addQuery, removeQuery} from './utils/routerUtils';
import {getActiveCategoryId, getMaxPrice, getMinPrice, getSearchText} from './utils/routes';

// Various filters for filtering down products
const filterCategory = (id) => ({categoryId}) =>
  categoryId === id;

const filterMinPrice = (minPrice) => ({price}) =>
  price >= minPrice;

const filterMaxPrice = (maxPrice) => ({price}) =>
  price <= maxPrice;

const filterSearchText = (searchText) => ({name}) =>
  name.toLowerCase().includes(searchText.toLowerCase());

class App extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })),

    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      images: PropTypes.shape({
        medium: PropTypes.string.isRequired,
        large: PropTypes.string.isRequired,
      }),
      categoryId: PropTypes.number.isRequired,
    }))
  };

  componentWillMount() {
    this.ensureActiveCategoryRedirect();
  }

  componentDidUpdate(prevProps) {
    if (getActiveCategoryId(this.props.location) !== getActiveCategoryId(prevProps.location)) {
      this.setSearchText('');
    }
  }

  ensureActiveCategoryRedirect() {
    const {location, history, categories} = this.props;
    if (!getActiveCategoryId(location)) {
      history.push(addQuery(location, {categoryId: categories[0].id}));
    }
  }

  setPriceFilters = (minPrice, maxPrice) => {
    let {location} = this.props;

    location = minPrice
      ? addQuery(location, {minPrice})
      : removeQuery(location, 'minPrice');

    location = maxPrice
      ? addQuery(location, {maxPrice})
      : removeQuery(location, 'maxPrice');

    this.props.history.push(location);
  };

  setSearchText = (q) => {
    this.props.history.push(
      q.trim()
        ? addQuery(this.props.location, {q})
        : removeQuery(this.props.location, 'q')
    );
  };

  getVisibleProducts() {
    const {location} = this.props;

    const activeCategoryId = getActiveCategoryId(location);
    const minPrice = getMinPrice(location);
    const maxPrice = getMaxPrice(location);
    const searchText = getSearchText(location);

    return this.props.products
      .filter(filterCategory(activeCategoryId))
      .filter(minPrice ? filterMinPrice(minPrice) : noopTrue)
      .filter(maxPrice ? filterMaxPrice(maxPrice) : noopTrue)
      .filter(searchText && searchText.length > 0 ? filterSearchText(searchText) : noopTrue);
  }

  render() {
    const {location, categories, products} = this.props;

    const category = findById(categories, getActiveCategoryId(location));
    // An active category is required to render.
    if (!category) {
      return null;
    }

    return (
      <div>
        <Header
          searchText={getSearchText(location)}
          setSearchText={this.setSearchText}
        />

        <div className="content">

          <div className="primary-flex">
            <Sidebar
              categories={categories}
              minPrice={getMinPrice(location)}
              maxPrice={getMaxPrice(location)}
              setPriceFilters={this.setPriceFilters}
            />

            <div className="primary-content">
              <ProductGrid
                title={category.name}
                items={this.getVisibleProducts()}
              />
            </div>
          </div>
        </div>

        <Route path="/products" render={({location, history}) => {
          const {itemId} = qs.parse(location.search);
          return (
            <ProductDetailsModal
              isOpen={Boolean(itemId)}
              close={() => history.push(removeQuery(location, 'itemId'))}
              item={findById(products, Number(itemId))}
            />
          );
        }} />

      </div>
    );
  }
}

export default function AppContainer(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/products" render={(routeProps) => <App {...props} {...routeProps} />} />
        <Redirect to="/products" />
      </Switch>
    </BrowserRouter>
  )
}