import React from 'react';
import './Sidebar.css';
import {PriceFilter} from './PriceFilter';
import {AddQueryNavLink} from '../utils/routerUtils';

export const Sidebar = (props) => (
  <div className="Sidebar">
    <div className="Sidebar__heading">
      All Categories
    </div>
    <ul className="Sidebar__links">
      {props.categories.map((category, i) => (
        <li key={category.id}>
          <AddQueryNavLink
            // Clear out searchText when changing categories.
            queryParams={{categoryId: category.id, q: undefined}}
            className="Sidebar_links__item"
            activeClassName="Sidebar_links__item--active"
          >
            {category.name}
          </AddQueryNavLink>
        </li>
      ))}
    </ul>

    <div className="Sidebar__heading">
      Filter By Price
    </div>

    <PriceFilter
      minPrice={props.minPrice}
      maxPrice={props.maxPrice}
      setPriceFilters={props.setPriceFilters}
    />
  </div>
);
