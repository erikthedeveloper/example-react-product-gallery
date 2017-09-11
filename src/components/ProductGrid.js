import React from 'react';
import './ProductGrid.css';
import {formatDollar} from '../utils';
import {AddQueryLink} from '../utils/routerUtils';

export const ProductGrid = (props) => (
  <div className="Grid">
    <h1 className="PrimaryHeading">{props.title}</h1>
    {props.items.length === 0 && <p className="no-results-message">No items found...</p>}
    {props.items.map(item => (
      <div className="Grid__item" key={item.id}>
        <AddQueryLink queryParams={{itemId: item.id}} className="ProductGridItem">
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
        </AddQueryLink>
      </div>
    ))}
  </div>
);
