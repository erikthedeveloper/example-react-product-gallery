import React from 'react';

const Search = () => {
  return (
    <div className="search">
      <form>
        <i className="fas fa-search search-icon" />
        <input className="search-form" placeholder="Search products by name" />
      </form>
    </div>
  );
};

export default Search;
