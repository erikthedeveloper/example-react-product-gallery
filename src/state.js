// @flow
import * as React from 'react';
import type {Category} from './types';
import {getCategories} from './requests';

const initialPriceFilter = {minPrice: null, maxPrice: null};

function useAppState() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [categoryId, setCategoryId] = React.useState<null | number>(null);
  const [searchText, setSearchText] = React.useState<string>('');
  const [{minPrice, maxPrice}, setPriceFilter] = React.useState<{
    [string]: number | null,
  }>(initialPriceFilter);

  // Request categories
  React.useEffect(() => {
    getCategories().then((categories: Category[]) => {
      setCategories(categories);
      setCategoryId(categories[0].id);
    });
  }, []);

  // Reset filters when changing categories
  React.useEffect(
    () => {
      setSearchText('');
      setPriceFilter(initialPriceFilter);
    },
    [categoryId]
  );

  return {
    categories,
    categoryId,
    setCategoryId,
    searchText,
    setSearchText,
    priceFilter: {minPrice, maxPrice, setPriceFilter},
  };
}

// $FlowFixMe Don't care about initial context value
const AppContext = React.createContext<$Call<typeof useAppState>>();

export function AppProvider({children}: {children: React.Node}) {
  return (
    <AppContext.Provider value={useAppState()}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return React.useContext(AppContext);
}
