import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './App.css';
import * as data from './data';

class App extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })),

    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      images: PropTypes.shape({
        medium: PropTypes.string.isRequired,
        large: PropTypes.string.isRequired,
      }),
      categoryId: PropTypes.number.isRequired,
    }))
  };

  static defaultProps = {
    categories: data.categories,
    products: data.products,
  };

  constructor() {
    super(...arguments);

    this.state = {
      activeCategory: this.props.categories[0].id,

      minPrice: null,
      maxPrice: null,

      searchText: '',

      viewingItemId: null,
    };
  }

  setActiveCategory = (activeCategory) => this.setState({activeCategory});

  setMinPrice = (minPrice) => this.setState({minPrice});
  setMaxPrice = (maxPrice) => this.setState({maxPrice});

  setSearchText = (searchText) => this.setState({searchText});

  onClickItem = (viewingItemId) => () => {
    this.setState({viewingItemId});
  };

  unFocusItem = () => this.setState({viewingItemId: null});

  render() {
    const {
      activeCategory,
      minPrice, maxPrice,
      searchText,
      viewingItemId,
    } = this.state;
    const {products, categories} = this.props;

    const noopTrue = () => true;

    const visibleProducts = products
      .filter(product => product.categoryId === activeCategory)
      .filter(minPrice ? ({price}) => price >= minPrice : noopTrue)
      .filter(maxPrice ? ({price}) => price <= maxPrice : noopTrue)
      .filter(searchText.length > 0 ? ({name}) => name.includes(searchText) : noopTrue)
    ;

    const viewingItem = viewingItemId
      ? products.find(({id}) => id === viewingItemId)
      : null;

    return (
      <div>
        <div className="Header">
          <div className="content header-flex">
            <div className="Header__title">
              Amazing<br />
              Store
            </div>
            <div className="SearchInput">
              <i className="SearchInput__icon fa fa-search" />
              <input
                type="text"
                className="SearchInput__input"
                placeholder="Search products by name"
                value={searchText}
                onChange={({target: {value}}) => this.setSearchText(value)}
              />
            </div>

          </div>
        </div>

        <div className="content">
          {viewingItemId > 0 && (
            <div
              className="Modal"
              onClick={this.unFocusItem}
            >
              <div className="Modal__contents">
                <img src={viewingItem.images.large} alt={viewingItem.name} />
                Hey! You are "viewing" item: {viewingItem.name}. Click to clear.
              </div>
            </div>
          )}
        <div className="primary-flex">

          <div className="Sidebar">

            <div className="Sidebar__heading">
              All Categories
            </div>
            <ul className="Sidebar__links">
              {categories.map((category, i) => (
                <li
                  key={category.id}
                  className={`Sidebar_links__item${activeCategory === category.id ? ' Sidebar_links__item--active' : ''}`}
                >
                  <a href="#" onClick={(event) => {
                    this.setActiveCategory(category.id);
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
                value={minPrice || ''}
                onChange={({target: {value}}) => {
                  this.setMinPrice(value);
                }}
              />
              <input
                type="number"
                className="PriceFilter__input"
                placeholder="$ Max"
                value={maxPrice || ''}
                onChange={({target: {value}}) => {
                  this.setMaxPrice(value);
                }}
              />
              <button className="Button Button--primary">
                Go
              </button>
            </div>

          </div>

          <div className="primary-content">

            <h1 className="PrimaryHeading">
              {categories.find(({id}) => id === activeCategory).name}
            </h1>

            <div className="Grid">
              {_.chunk(visibleProducts, 4).map((productsRow, i) => (
                <div className="Grid__row" key={i}>
                  {productsRow.map(product => (
                    <div className="Grid__item" key={product.id}>
                      <div className="ProductGridItem" onClick={this.onClickItem(product.id)}>
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
