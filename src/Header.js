// @flow
import React from 'react';

export function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <a href="/" className="logo-link">
          Store Name
        </a>
      </div>
      <div className="header__search">
        {/* TODO: Handle submit and stuff */}
        <form>
          {/* TODO: Search icon */}
          <input type="text" name="q" className="header__search-input" />
        </form>
      </div>
    </header>
  );
}
