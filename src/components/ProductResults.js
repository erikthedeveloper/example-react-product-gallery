// @flow
import * as React from 'react';
import cn from 'classnames';
import {FilterItem} from './FilterItem';
import {ProductGrid} from './ProductGrid';
import {useAppContext} from '../context/AppContext';
import {useProductResults} from '../hooks/useProductResults';

export function ProductResults() {
  const [
    {categories, activeProductLoading, categoryId, searchText, priceFilter},
    dispatch,
  ] = useAppContext();
  const {minPrice, maxPrice} = priceFilter;
  const {products, loading} = useProductResults({
    categoryId,
    searchText,
    minPrice,
    maxPrice,
  });

  const {name: categoryName} = categories.find(({id}) => id === categoryId) || {
    name: 'Loading...',
  };

  return (
    <div
      className={cn(
        'primary-content',
        (loading || activeProductLoading) && 'loading'
      )}
    >
      {searchText && (
        <FilterItem
          resetFilter={() =>
            dispatch({type: 'UPDATE_SEARCH_CRITERIA', searchText: ''})
          }
        >
          "{searchText}"
        </FilterItem>
      )}
      {minPrice && (
        <FilterItem
          resetFilter={() =>
            dispatch({
              type: 'UPDATE_SEARCH_CRITERIA',
              priceFilter: {...priceFilter, minPrice: null},
            })
          }
        >
          Min: ${minPrice}
        </FilterItem>
      )}
      {maxPrice && (
        <FilterItem
          resetFilter={() =>
            dispatch({
              type: 'UPDATE_SEARCH_CRITERIA',
              priceFilter: {...priceFilter, maxPrice: null},
            })
          }
        >
          Max: ${maxPrice}
        </FilterItem>
      )}
      <h2 className="screen-title">{categoryName}</h2>
      <ProductGrid products={products} />
    </div>
  );
}
