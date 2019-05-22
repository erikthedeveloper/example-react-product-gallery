import React from 'react';
import './App.css';
import logo from './logo.svg';
import * as requests from './requests';

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
    <div className="App">
      <header className="App-header">
        <h2>Product Gallery Demo Project</h2>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React Docs
        </a>
      </header>
    </div>
  );
}
