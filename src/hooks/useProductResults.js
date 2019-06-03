// @flow
import * as React from 'react';
import type {Product} from '../types';
import {getProducts} from '../requests';

export function useProductResults({
  categoryId,
  searchText,
  minPrice,
  maxPrice,
}: {
  categoryId: number | null,
  searchText?: string,
  minPrice?: ?number,
  maxPrice?: ?number,
}) {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(
    () => {
      if (!categoryId) {
        return;
      }

      const requestProducts = () => {
        setLoading(true);
        getProducts({categoryId, searchText, minPrice, maxPrice})
          .then((products: Product[]) => {
            setProducts(products);
          })
          .then(() => setLoading(false));
      };

      // Debounce to prevent multiple request for rapid programmatic criteria changes
      const timeoutID = setTimeout(requestProducts, 100);
      return () => {
        clearTimeout(timeoutID);
      };
    },
    [categoryId, searchText, minPrice, maxPrice]
  );

  return {
    products,
    loading,
  };
}
