// @flow
import * as React from 'react';
import './App.css';
import {Header} from './components/Header';
import {Sidebar} from './components/Sidebar';
import {AppProvider} from './context/AppContext';
import {ProductResults} from './components/ProductResults';
import {ProductDetails} from './components/ProductDetails';
import {Modal} from './components/Modal';
import {
  ActiveProductProvider,
  useActiveProductContext,
} from './context/ActiveProductContext';

function App() {
  const {activeProduct, deselectProduct} = useActiveProductContext();

  return (
    <div>
      <Header title="Amazing Store" />
      <div className="container container--primary">
        <Sidebar />
        <ProductResults />
        <Modal isOpen={Boolean(activeProduct)} close={deselectProduct}>
          {activeProduct && <ProductDetails product={activeProduct} />}
        </Modal>
      </div>
    </div>
  );
}

export default () => (
  <AppProvider>
    <ActiveProductProvider>
      <App />
    </ActiveProductProvider>
  </AppProvider>
);
