// @flow
import React from 'react';
import './ProductGrid.css';
import type {Product} from '../types';
import {useActiveProductContext} from '../context/ActiveProductContext';

export function ProductGrid({products}: {products: Product[]}) {
  const {selectProduct} = useActiveProductContext();
  return (
    <div className="ProductGrid">
      {products.map(product => (
        <button
          key={product.id}
          className="ProductGridItem"
          onClick={() => selectProduct(product.id)}
        >
          <img
            className="ProductGridItem__img"
            src={product.images.medium}
            alt={product.name}
          />
          <div className="ProductGridItem__name">{product.name}</div>
          {/* TODO: Format price */}
          <div className="ProductGridItem__price">${product.price}</div>
        </button>
      ))}
    </div>
  );
}
