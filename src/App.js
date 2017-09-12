import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import qs from 'query-string';
import './App.css';
import {findById} from './utils';
import {Header} from './components/Header';
import {ProductGrid} from './components/ProductGrid';
import {Sidebar} from './components/Sidebar';
import {ProductDetailsModal} from './components/ProductDetailsModal';
import {addQuery, removeQuery} from './utils/routerUtils';
import {getActiveCategoryId, getMaxPrice, getMinPrice, getSearchText} from './utils/routes';
import {getCategories, getProducts, productQueryParams} from './requests';

class App extends Component {
  static propTypes = {
    requestProducts: PropTypes.func.isRequired,
    requestCategories: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,

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

  static defaultProps = {
    categories: [],
    products: [],
  };

  componentWillMount() {
    this.ensureActiveCategoryRedirect();
  }

  componentDidMount() {
    this.props.requestCategories();
  }

  componentDidUpdate(prevProps) {
    // We can't set a default category id until we have categories! ...there must be a better way?
    if (prevProps.categories.length === 0 && this.props.categories.length > 0) {
      this.setState(
        {activeCategoryId: this.props.categories[0].id},
        // We can't request products until we have a category! ...there must be a better way?
        this.requestProducts
      )
    }

    if (getActiveCategoryId(this.props.location) !== getActiveCategoryId(prevProps.location)) {
      this.setSearchText('');
    }

    // Thanks to location.search being a string and knowing that the params are sorted, we can use string equality.
    if (prevProps.location.search !== this.props.location.search) {
      this.requestProducts();
    }
  }

  requestProducts = () => {
    const {location} = this.props;
    this.props.requestProducts(productQueryParams(location));
  };

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
                items={this.props.products}
                loading={this.props.loading}
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

class AppContainer extends React.Component {
  state = {
    loading: false,
    products: undefined,
    categories: undefined,
  };

  requestProducts = async (...args) => {
    this.setState({loading: true});
    const products = await getProducts(...args);
    this.setState({
      products,
      loading: false,
    })
  };

  requestCategories = async () => {
    this.setState({
      categories: await getCategories(),
    });
  };

  render() {
    const props = {
      ...this.props,
      ...this.state,
      requestProducts: this.requestProducts,
      requestCategories: this.requestCategories,
    };

    return <App {...props} />;
  }
}

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/products" render={(routeProps) => <AppContainer {...routeProps} />} />
        <Redirect to="/products" />
      </Switch>
    </BrowserRouter>
  )
}
