// @flow
import React from 'react';
import './Header.css';

export function Header({title}: {title: string}) {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">
          <a href="/" className="logo-link">
            {title}
          </a>
        </div>
        <div className="header__search">
          {/* TODO: Handle submit and stuff */}
          <form>
            {/* TODO: Search icon */}
            <input
              type="text"
              name="q"
              className="header__search-input"
              placeholder="Search products by name"
            />
          </form>
        </div>
      </div>
    </header>
  );
}
