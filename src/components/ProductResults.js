// @flow
import * as React from 'react';
import cn from 'classnames';
import {FilterItem} from './FilterItem';
import {ProductGrid} from './ProductGrid';
import {useAppContext} from '../state';
import {useProductResults} from '../hooks/useProductResults';

export function ProductResults() {
  const {
    categories,
    categoryId,
    searchText,
    setSearchText,
    priceFilter: {minPrice, maxPrice, setPriceFilter},
  } = useAppContext();
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
    <div className={cn('primary-content', loading && 'loading')}>
      {searchText && (
        <FilterItem resetFilter={() => setSearchText('')}>
          "{searchText}"
        </FilterItem>
      )}
      {minPrice && (
        <FilterItem
          resetFilter={() =>
            setPriceFilter(filter => ({...filter, minPrice: null}))
          }
        >
          Min: ${minPrice}
        </FilterItem>
      )}
      {maxPrice && (
        <FilterItem
          resetFilter={() =>
            setPriceFilter(filter => ({...filter, maxPrice: null}))
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
