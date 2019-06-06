// @flow
import * as React from 'react';
import './ProductDetails.css';
import type {Product} from '../types';

export function ProductDetails({product}: {product: Product}) {
  return (
    <div className="ProductDetails">
      <img
        src={product.images.large}
        alt={product.name}
        className="ProductDetails__image"
      />
      <div>
        <h2 className="ProductDetails__name">{product.name}</h2>
        <div className="ProductDetails__price">${product.price}</div>
        <p className="ProductDetails__description">{product.description}</p>
      </div>
    </div>
  );
}
