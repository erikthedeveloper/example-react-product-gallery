import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import qs from 'query-string';
import {findById} from '../utils';
import {Header} from './Header';
import {ProductGrid} from './ProductGrid';
import {Sidebar} from './Sidebar';
import {ProductDetailsModal} from './ProductDetailsModal';
import {removeQuery} from '../utils/routerUtils';
import {
  getActiveCategoryId,
  getMaxPrice,
  getMinPrice,
  getSearchText,
} from '../utils/routes';
import {PrimaryContent, PrimaryFlex, Row} from './layout';

export class AppLayout extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,

    setPriceFilters: PropTypes.func.isRequired,
    setSearchText: PropTypes.func.isRequired,

    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,

    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        images: PropTypes.shape({
          medium: PropTypes.string.isRequired,
          large: PropTypes.string.isRequired,
        }),
        categoryId: PropTypes.number.isRequired,
      })
    ).isRequired,
  };

  render() {
    const {
      location,
      loading,
      categories,
      products,
      setSearchText,
      setPriceFilters,
    } = this.props;

    const category = findById(categories, getActiveCategoryId(location));

    return (
      <div>
        <Header
          searchText={getSearchText(location)}
          setSearchText={setSearchText}
        />

        <Row>
          <PrimaryFlex>
            <Sidebar
              categories={categories}
              minPrice={getMinPrice(location)}
              maxPrice={getMaxPrice(location)}
              setPriceFilters={setPriceFilters}
            />

            <PrimaryContent>
              <ProductGrid
                title={(category && category.name) || ''}
                items={products}
                loading={!category || loading}
              />
            </PrimaryContent>
          </PrimaryFlex>
        </Row>

        <Route
          path="/products"
          render={({location, history}) => {
            const {itemId} = qs.parse(location.search);
            return (
              <ProductDetailsModal
                isOpen={Boolean(itemId)}
                close={() => history.push(removeQuery(location, 'itemId'))}
                item={findById(products, Number(itemId))}
              />
            );
          }}
        />
      </div>
    );
  }
}
