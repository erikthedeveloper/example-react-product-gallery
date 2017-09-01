import React from 'react';
import './ProductGrid.css';
import {formatDollar} from '../utils';

export const ProductGrid = (props) => (
  <div className="Grid">
    <h1 className="PrimaryHeading">{props.title}</h1>
    {props.items.length === 0 && <p className="no-results-message">No items found...</p>}
    {props.items.map(item => (
      <div className="Grid__item" key={item.id}>
        <div className="ProductGridItem" onClick={props.onClickItem(item.id)}>
          <img
            src={item.images.medium}
            className="ProductGridItem__image"
            alt={item.name}
          />
          <div className="ProductGridItem__name">
            {item.name}
          </div>
          <div className="ProductGridItem__price">
            {formatDollar(item.price)}
          </div>
        </div>
      </div>
    ))}
  </div>
);
