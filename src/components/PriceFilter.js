// @flow
import * as React from 'react';
import './PriceFilter.css';
import {useAppContext} from '../state';
import {useIntermediaryState} from '../hooks/userIntermediaryState';

export function PriceFilter() {
  const {priceFilter} = useAppContext();
  const [minPrice, setMinPrice] = useIntermediaryState(priceFilter.minPrice);
  const [maxPrice, setMaxPrice] = useIntermediaryState(priceFilter.maxPrice);

  return (
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
  );
}
