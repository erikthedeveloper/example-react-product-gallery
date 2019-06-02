// @flow
import React from 'react';
import './App.css';
import type {Category} from './types';
import {getCategories} from './requests';
import {Header} from './Header';
import {Sidebar} from './Sidebar';
import {ProductGrid} from './ProductGrid';
import {FilterItem} from './components/FilterItem';
import {useProductResults} from './hooks/useProductResults';

export default function App() {
  const {
    categories,
    categoryId,
    setCategoryId,
    searchText,
    setSearchText,
    products,
  } = useAppState();

  const {name: categoryName} =
    categories.find(({id}) => id === categoryId) || {};

  return (
    <div>
      <Header
        title="Amazing Store"
        searchText={searchText}
        submitSearchText={value => setSearchText(value)}
      />

      <div className="container container--primary">
        <Sidebar
          categories={categories}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
        <div className="primary-content">
          {searchText && (
            <FilterItem resetFilter={() => setSearchText('')}>
              "{searchText}"
            </FilterItem>
          )}
          <h2 className="screen-title">{categoryName}</h2>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}

function useAppState() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [categoryId, setCategoryId] = React.useState<null | number>(null);
  const [searchText, setSearchText] = React.useState('');
  const {products} = useProductResults({categoryId, searchText});

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
    products,
  };
}
