import React from 'react';

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
    <div className="PriceFilter">
      <input
        type="number"
        className="PriceFilter__input"
        placeholder="$ Min"
        value={props.minPrice || ''}
        onChange={({target: {value}}) => {
          props.setMinPrice(value);
        }}
      />
      <input
        type="number"
        className="PriceFilter__input"
        placeholder="$ Max"
        value={props.maxPrice || ''}
        onChange={({target: {value}}) => {
          props.setMaxPrice(value);
        }}
      />
      <button className="Button Button--primary">
        Go
      </button>
    </div>
  </div>
);
