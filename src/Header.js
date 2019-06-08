import React from 'react';
import Search from './Search';

const Header = () => {
  return (
    <section className="header">
      <div className="store-title">
        <h1>Robots & Kittens</h1>
      </div>
      <Search />
    </section>
  );
};

export default Header;
