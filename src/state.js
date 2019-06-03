// @flow
import * as React from 'react';
import type {Category} from './types';
import {getCategories} from './requests';

function useAppState() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [categoryId, setCategoryId] = React.useState<null | number>(null);
  const [searchText, setSearchText] = React.useState<string>('');

  React.useEffect(() => {
    getCategories().then((categories: Category[]) => {
      setCategories(categories);
      setCategoryId(categories[0].id);
    });
  }, []);

  React.useEffect(
    () => {
      setSearchText('');
    },
    [categoryId]
  );

  return {
    categories,
    categoryId,
    setCategoryId,
    searchText,
    setSearchText,
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
