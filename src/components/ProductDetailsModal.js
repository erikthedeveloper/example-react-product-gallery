import React from 'react';
import './ProductDetailsModal.css';
import {formatDollar, stopPropagation} from '../utils';

export const ProductDetailsModal = ({isOpen, close, item}) => {
  return !isOpen ? null : (
    <div
      className="Modal"
      onClick={close}
    >
      <div className="Modal__contents" onClick={stopPropagation}>

        <i className="fa fa-times Modal__x" onClick={close} />

        <div className="ProductDetails">
          <img
            src={item.images.large}
            alt={item.name}
            className="ProductDetails__image"
          />
          <div className="ProductDetails__name">
            {item.name}
          </div>
          <div className="ProductDetails__price">
            {formatDollar(item.price)}
          </div>
          <div className="ProductDetails__description">
            {item.description}
          </div>
        </div>

      </div>
    </div>
  )
};
