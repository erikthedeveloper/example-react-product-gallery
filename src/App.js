import React from 'react';
import './App.css';
import logo from './logo.svg';
import * as requests from './requests';
import Header from './Header';

export default function App() {
  // Here as an example to get you started with requests.js
  React.useEffect(() => {
    (async () => {
      const categories = await requests.getCategories();
      const products = await requests.getProducts({
        categoryId: categories[0].id,
      });
      const product = await requests.getProduct(products[0].id);
      console.log('Example request: categories', categories);
      console.log('Example request: products', products);
      console.log('Example request: product', product);
    })();
  }, []);

  return (
    <div className="product-listing">
      <Header />
      <section className="product-container">
        <div className="filter">
          <h3>All Categories</h3>
          <div className="categories">
            <ul>
              <li>Robots</li>
              <li>Monsters</li>
              <li>Kittens</li>
            </ul>
          </div>
          <div className="price-filter">
            <form>
              <label>Min</label>
              <input />
              <label>Max</label>
              <input />
              <button>Go</button>
            </form>
          </div>
        </div>
        <div className="product-list">
          <h2>Product Category</h2>
          <ul>
            <li>Product 1</li>
            <li>Product 2</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
