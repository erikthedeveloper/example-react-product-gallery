// @flow
import React from 'react';
import './Header.css';
import {useIntermediaryState} from '../hooks/userIntermediaryState';
import {useAppContext} from '../context/AppContext';

export function Header({title}: {title: string}) {
  const {searchText, setSearchText} = useAppContext();
  const [inputValue, setInputValue] = useIntermediaryState(searchText);

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">
          <a href="/" className="logo-link">
            {title}
          </a>
        </div>
        <div className="header__search">
          <form
            onSubmit={event => {
              event.preventDefault();
              setSearchText(inputValue);
            }}
          >
            {/* TODO: Search icon */}
            <input
              type="text"
              name="searchText"
              value={inputValue}
              onChange={({target: {value}}) => setInputValue(value)}
              className="header__search-input"
              placeholder="Search products by name"
            />
          </form>
        </div>
      </div>
    </header>
  );
}
