// @flow
import React from 'react';
import './ProductGrid.css';
import type {Product} from '../types';
import {useAppDispatch} from '../context/AppContext';

export function ProductGrid({products}: {products: Product[]}) {
  const dispatch = useAppDispatch();
  return (
    <div className="ProductGrid">
      {products.map(product => (
        <button
          key={product.id}
          className="ProductGridItem"
          onClick={() => dispatch({type: 'SELECT_PRODUCT', id: product.id})}
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
