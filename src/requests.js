import * as data from './data';
import {noopTrue} from './utils';

const REQUEST_DELAY = 750;

// Various filters for filtering down products
const filterCategory = (id) => ({categoryId}) =>
  categoryId === id;

const filterMinPrice = (minPrice) => ({price}) =>
  price >= minPrice;

const filterMaxPrice = (maxPrice) => ({price}) =>
  price <= maxPrice;

const filterSearchText = (searchText) => ({name}) =>
  name.toLowerCase().includes(searchText.toLowerCase());

export function getProducts({
  activeCategoryId,
  minPrice,
  maxPrice,
  searchText,
}) {
  return new Promise((resolve) => {
    const filteredItems = data.products
      .filter(filterCategory(activeCategoryId))
      .filter(minPrice ? filterMinPrice(minPrice) : noopTrue)
      .filter(maxPrice ? filterMaxPrice(maxPrice) : noopTrue)
      .filter(searchText.length > 0 ? filterSearchText(searchText) : noopTrue);

    setTimeout(resolve.bind(null, filteredItems), REQUEST_DELAY);
  }) ;
}

export function getCategories() {
  return new Promise((resolve) => {
    setTimeout(resolve.bind(null, data.categories), REQUEST_DELAY);
  }) ;
}


