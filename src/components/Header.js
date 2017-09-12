import React from 'react';
import './Header.css';

export const Header = ({searchText, setSearchText}) => (
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
          value={searchText || ''}
          onChange={({target: {value}}) => setSearchText(value)}
        />
      </div>

    </div>
  </div>
);
