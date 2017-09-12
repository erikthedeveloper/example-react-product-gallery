import React from 'react';
import './Header.css';
import {SearchInput} from './SearchInput';
import {Link} from 'react-router-dom';

export const Header = ({searchText, setSearchText}) => (
  <div className="Header">
    <div className="content header-flex">
      <Link to="/" className="Header__title">
        Robots<br />
        &amp; Kittens
      </Link>
      <SearchInput searchText={searchText} setSearchText={setSearchText} />
    </div>
  </div>
);
