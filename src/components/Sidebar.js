// @flow
import React from 'react';
import cn from 'classnames';
import './Sidebar.css';
import {useAppContext} from '../context/AppContext';
import {PriceFilter} from './PriceFilter';

export function Sidebar() {
  const [{categories, categoryId}, dispatch] = useAppContext();
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
              onClick={() => dispatch({type: 'SELECT_CATEGORY', id})}
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
