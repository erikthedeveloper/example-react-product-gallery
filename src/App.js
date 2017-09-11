import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route} from 'react-router-dom';
import qs from 'query-string';
import './App.css';
import {findById, noopTrue} from './utils';
import {Header} from './components/Header';
import {ProductGrid} from './components/ProductGrid';
import {Sidebar} from './components/Sidebar';
import {ProductDetailsModal} from './components/ProductDetailsModal';
import {removeQuery} from './utils/routerUtils';

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

  state = {
    activeCategoryId: this.props.categories[0].id,

    minPrice: null,
    maxPrice: null,

    searchText: '',
  };

  setActiveCategoryId = (activeCategoryId) => this.setState({activeCategoryId});

  setMinPrice = (minPrice) => this.setState({minPrice});
  setMaxPrice = (maxPrice) => this.setState({maxPrice});

  setSearchText = (searchText) => this.setState({searchText});

  getVisibleProducts() {
    const {
      activeCategoryId, searchText,
      minPrice, maxPrice,
    } = this.state;

    return this.props.products
      .filter(filterCategory(activeCategoryId))
      .filter(minPrice ? filterMinPrice(minPrice) : noopTrue)
      .filter(maxPrice ? filterMaxPrice(maxPrice) : noopTrue)
      .filter(searchText.length > 0 ? filterSearchText(searchText) : noopTrue);
  }

  render() {
    const {props, state} = this;

    const activeCategoryName = findById(props.categories, state.activeCategoryId).name;

    return (
      <div>
        <Header
          searchText={state.searchText}
          setSearchText={this.setSearchText}
        />

        <div className="content">

          <div className="primary-flex">
            <Sidebar
              categories={props.categories}
              activeCategoryId={state.activeCategoryId}
              setActiveCategoryId={this.setActiveCategoryId}
              minPrice={state.minPrice}
              setMinPrice={this.setMinPrice}
              maxPrice={state.maxPrice}
              setMaxPrice={this.setMaxPrice}
            />

            <div className="primary-content">
              <ProductGrid
                title={activeCategoryName}
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
              item={findById(props.products, Number(itemId))}
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
      <App {...props} />
    </BrowserRouter>
  )
}