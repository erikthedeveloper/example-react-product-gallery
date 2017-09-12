import React from 'react';
import './Header.css';
import {SearchInput} from './SearchInput';

export const Header = ({searchText, setSearchText}) => (
  <div className="Header">
    <div className="content header-flex">
      <div className="Header__title">
        Amazing<br />
        Store
      </div>
      <SearchInput searchText={searchText} setSearchText={setSearchText} />
    </div>
  </div>
);
