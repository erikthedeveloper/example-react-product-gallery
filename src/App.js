// @flow
import * as React from 'react';
import './App.css';
import {Header} from './components/Header';
import {Sidebar} from './components/Sidebar';
import {AppProvider, useAppContext} from './context/AppContext';
import {ProductResults} from './components/ProductResults';
import {ProductDetails} from './components/ProductDetails';
import {Modal} from './components/Modal';

function App() {
  const [{activeProduct}, dispatch] = useAppContext();

  return (
    <div>
      <Header title="Amazing Store" />
      <div className="container container--primary">
        <Sidebar />
        <ProductResults />
        <Modal
          isOpen={Boolean(activeProduct)}
          close={() => dispatch({type: 'DESELECT_PRODUCT'})}
        >
          {activeProduct && <ProductDetails product={activeProduct} />}
        </Modal>
      </div>
    </div>
  );
}

export default () => (
  <AppProvider>
    <App />
  </AppProvider>
);
