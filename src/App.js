// @flow
import React from 'react';
import './App.css';
import type {Category, Product} from './types';
import {getCategories, getProducts} from './requests';
import {Header} from './Header';
import {Sidebar} from './Sidebar';
import {ProductGrid} from './ProductGrid';

export default function App() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [categoryId, setCategoryId] = React.useState<null | number>(null);

  React.useEffect(() => {
    getCategories().then((categories: Category[]) => {
      setCategories(categories);
      setCategoryId(categories[0].id);
    });
  }, []);

  React.useEffect(
    () => {
      getProducts({categoryId}).then((products: Product[]) => {
        setProducts(products);
      });
    },
    [categoryId]
  );

  const {name: categoryName} =
    categories.find(({id}) => id === categoryId) || {};

  return (
    <div>
      <Header title="Amazing Store" />

      <div className="container container--primary">
        <Sidebar
          categories={categories}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
        <div className="primary-content">
          <h2 className="screen-title">{categoryName}</h2>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
