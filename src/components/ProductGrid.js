import React from 'react';
import './ProductGrid.css';
import {formatDollar} from '../utils';
import {AddQueryLink} from '../utils/routerUtils';

const LoadingSpinner = () => (
  <div className="LoadingSpinner">
    <i className="fa fa-cog fa-spin fa-fw" />
    <span className="sr-only">Loading...</span>
  </div>
);

export const ProductGrid = (props) => (
  <div className="Grid" style={{opacity: props.loading ? '0.7' : '1', transition: 'all 200ms'}}>
    <h1 className="PrimaryHeading">{props.title}</h1>
    {props.items.length === 0 && (props.loading
      ? <LoadingSpinner />
      : <p className="no-results-message">No items found...</p>
    )}
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
