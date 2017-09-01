import React from 'react';
import {PriceFilter} from './PriceFilter';

export const Sidebar = (props) => (
  <div className="Sidebar">
    <div className="Sidebar__heading">
      All Categories
    </div>
    <ul className="Sidebar__links">
      {props.categories.map((category, i) => (
        <li
          key={category.id}
          className={`Sidebar_links__item${props.activeCategoryId === category.id ? ' Sidebar_links__item--active' : ''}`}
        >
          <a href="#" onClick={(event) => {
            props.setActiveCategoryId(category.id);
            event.preventDefault();
          }}>
            {category.name}
          </a>
        </li>
      ))}
    </ul>

    <div className="Sidebar__heading">
      Filter By Price
    </div>

    <PriceFilter
      minPrice={props.minPrice}
      setMinPrice={props.setMinPrice}
      maxPrice={props.maxPrice}
      setMaxPrice={props.setMaxPrice}
    />
  </div>
);
