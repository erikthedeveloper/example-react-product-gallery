// @flow
import * as React from 'react';
import './App.css';
import {Header} from './components/Header';
import {Sidebar} from './components/Sidebar';
import {AppProvider, useAppContext} from './context/AppContext';
import {ProductResults} from './components/ProductResults';
import {ProductDetails} from './components/ProductDetails';
import {Modal} from './components/Modal';
import {getCategories, getProduct} from './requests';
import type {Category, Product} from './types';

function App() {
  useAppEffect();
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

function useAppEffect() {
  const [state, dispatch] = useAppContext();

  // Request categories
  React.useEffect(
    () => {
      getCategories().then((data: Category[]) => {
        dispatch({
          type: 'FETCH_CATEGORIES',
          status: 'success',
          data,
        });
      });
    },
    [dispatch]
  );

  // Request product when product selected
  const {activeProductId} = state;
  React.useEffect(
    () => {
      if (!activeProductId) {
        return;
      }
      dispatch({
        type: 'FETCH_PRODUCT',
        status: 'begin',
        id: activeProductId,
      });
      getProduct(activeProductId).then((data: Product) => {
        dispatch({
          type: 'FETCH_PRODUCT',
          status: 'success',
          id: activeProductId,
          data,
        });
      });
    },
    [activeProductId, dispatch]
  );
}

export default () => (
  <AppProvider>
    <App />
  </AppProvider>
);
