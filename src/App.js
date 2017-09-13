import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import qs from 'query-string';
import './App.css';
import {findById} from './utils';
import {Header} from './components/Header';
import {ProductGrid} from './components/ProductGrid';
import {Sidebar} from './components/Sidebar';
import {ProductDetailsModal} from './components/ProductDetailsModal';
import {removeQuery} from './utils/routerUtils';
import {getActiveCategoryId, getMaxPrice, getMinPrice, getSearchText} from './utils/routes';

export default class App extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,

    setPriceFilters: PropTypes.func.isRequired,
    setSearchText: PropTypes.func.isRequired,

    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,

    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      images: PropTypes.shape({
        medium: PropTypes.string.isRequired,
        large: PropTypes.string.isRequired,
      }),
      categoryId: PropTypes.number.isRequired,
    })).isRequired,
  };

  render() {
    const {
      location, loading,
      categories, products,
      setSearchText, setPriceFilters,
    } = this.props;

    const category = findById(categories, getActiveCategoryId(location));

    return (
      <div>
        <Header
          searchText={getSearchText(location)}
          setSearchText={setSearchText}
        />

        <div className="content">

          <div className="primary-flex">
            <Sidebar
              categories={categories}
              minPrice={getMinPrice(location)}
              maxPrice={getMaxPrice(location)}
              setPriceFilters={setPriceFilters}
            />

            <div className="primary-content">
              <ProductGrid
                title={(category && category.name) || ''}
                items={products}
                loading={!category || loading}
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
