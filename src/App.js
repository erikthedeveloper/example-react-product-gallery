import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import {products, categories} from './data';

class App extends Component {
  render() {
    return (
      <div>
        <div className="Header">
          <div className="content header-flex">
            <div className="Header__title">
              Amazing Store
            </div>
            <div className="SearchInput">
              <div className="SearchInput__icon" />
              <input
                type="text"
                className="SearchInput__input"
                placeholder="Search products by name"
              />
            </div>

          </div>
        </div>

        <div className="content">
        <div className="primary-flex">

          <div className="Sidebar">

            <div className="Sidebar__heading">
              All Categories
            </div>
            <ul className="Sidebar__links">
              {categories.map((category, i) => (
                <li
                  key={category.id}
                  className={`Sidebar_links__item${i === 0 ? ' Sidebar_links__item--active' : ''}`}
                >
                  <a href="#" onClick={(event) => {
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
              />
              <input
                type="number"
                className="PriceFilter__input"
                placeholder="$ Max"
              />
              <button className="Button Button--primary">
                Go
              </button>
            </div>

          </div>

          <div className="primary-content">

            <h1 className="PrimaryHeading">
              Current Category
            </h1>

            <div className="Grid">
              {_.chunk(products, 4).map((productsRow) => (
                <div className="Grid__row">
                  {productsRow.map(product => (
                    <div className="Grid__item" key={product.id}>
                      <div className="ProductGridItem">
                        <img
                          src={product.images.medium}
                          className="ProductGridItem__image"
                          alt={product.name}
                        />
                        <div className="ProductGridItem__name">
                          {product.name}
                        </div>
                        <div className="ProductGridItem__price">
                          ${product.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

            </div>

          </div>
        </div>

        </div>
      </div>
    );
  }
}

export default App;
