// @flow
import * as React from 'react';
import type {Product} from '../types';
import {getProduct} from '../requests';

function useActiveProduct() {
  const [id, setId] = React.useState<null | number>(null);
  const [activeProduct, setActiveProduct] = React.useState<Product | null>(
    null
  );

  // Request product when product selected
  React.useEffect(
    () => {
      getProduct(id).then(setActiveProduct);
      return () => {
        setActiveProduct(null);
      };
    },
    [id]
  );

  function selectProduct(id: number) {
    setId(id);
  }

  function deselectProduct() {
    setId(null);
  }

  return {
    activeProduct,
    selectProduct,
    deselectProduct,
    loading: Boolean(id && !activeProduct),
  };
}

// $FlowFixMe Don't care about initial context value
const ActiveProductContext = React.createContext<$Call<typeof useAppState>>();

export function ActiveProductProvider({children}: {children: React.Node}) {
  return (
    <ActiveProductContext.Provider value={useActiveProduct()}>
      {children}
    </ActiveProductContext.Provider>
  );
}

export function useActiveProductContext() {
  return React.useContext(ActiveProductContext);
}
