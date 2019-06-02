// @flow
import * as React from 'react';
import type {Product} from '../types';
import {getProducts} from '../requests';

export function useProductResults({
  categoryId,
  searchText,
}: {
  categoryId: number | null,
  searchText?: string,
}) {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(
    () => {
      if (!categoryId) {
        return;
      }

      setLoading(true);
      getProducts({categoryId, searchText})
        .then((products: Product[]) => {
          setProducts(products);
        })
        .then(() => setLoading(false));
    },
    [categoryId, searchText]
  );

  return {
    products,
    loading,
  };
}
