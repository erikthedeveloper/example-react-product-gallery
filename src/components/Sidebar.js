// @flow
import React from 'react';
import cn from 'classnames';
import './Sidebar.css';
import {useAppContext} from '../state';
import {useIntermediaryState} from '../hooks/userIntermediaryState';

export function Sidebar() {
  const {categories, categoryId, setCategoryId} = useAppContext();
  return (
    <div className="sidebar">
      <div className="sidebar__title">All Categories</div>
      <ul className="sidebar__links">
        {categories.map(({id, name}) => (
          <li
            key={name}
            className={cn(
              'sidebar__link',
              id === categoryId && 'sidebar__link--active'
            )}
          >
            <button
              type="button"
              className="button-reset"
              onClick={() => setCategoryId(id)}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>

      <div className="sidebar__title">Filter by price</div>
      <PriceFilter />
    </div>
  );
}

function PriceFilter() {
  const {priceFilter} = useAppContext();
  const [minPrice, setMinPrice] = useIntermediaryState(priceFilter.minPrice);
  const [maxPrice, setMaxPrice] = useIntermediaryState(priceFilter.maxPrice);

  return (
    <div>
      <form
        className="PriceFilter"
        onSubmit={event => {
          event.preventDefault();
          priceFilter.setPriceFilter({minPrice, maxPrice});
        }}
      >
        <input
          type="number"
          className="input"
          placeholder="$ Min"
          name="minPrice"
          value={minPrice || ''}
          onChange={({target: {value}}) => {
            setMinPrice(value);
          }}
        />
        <input
          type="number"
          className="input"
          placeholder="$ Max"
          name="maxPrice"
          value={maxPrice || ''}
          onChange={({target: {value}}) => {
            setMaxPrice(value);
          }}
        />
        <button type="submit" className="button">
          Go
        </button>
      </form>
    </div>
  );
}
