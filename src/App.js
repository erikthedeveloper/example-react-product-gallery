// @flow
import * as React from 'react';
import './App.css';
import {Header} from './components/Header';
import {Sidebar} from './components/Sidebar';
import {AppProvider} from './state';
import {ProductResults} from './components/ProductResults';

function App() {
  return (
    <div>
      <Header title="Amazing Store" />
      <div className="container container--primary">
        <Sidebar />
        <ProductResults />
      </div>
    </div>
  );
}

export default () => (
  <AppProvider>
    <App />
  </AppProvider>
);
