import * as data from './data';

/**
 * "Request" products given query params
 * @param categoryId
 * @param minPrice
 * @param maxPrice
 * @param searchText
 * @returns {Promise}
 */
export function getProducts({categoryId, minPrice, maxPrice, searchText}) {
  return new Promise(resolve => {
    const filteredItems = data.products
      .filter(filterCategory(categoryId))
      .filter(minPrice ? filterMinPrice(minPrice) : noopTrue)
      .filter(maxPrice ? filterMaxPrice(maxPrice) : noopTrue)
      .filter(
        searchText && searchText.length > 0
          ? filterSearchText(searchText)
          : noopTrue
      );

    setTimeout(resolve.bind(null, filteredItems), requestDelay());
  });
}

/**
 * "Request" a single product by id.
 * @param id
 * @returns {Promise}
 */
export function getProduct(id) {
  return new Promise(resolve => {
    const item = data.products.find(item => item.id === id);
    setTimeout(resolve.bind(null, item), requestDelay());
  });
}

/**
 * "Request" categories
 * @returns {Promise}
 */
export function getCategories() {
  return new Promise(resolve => {
    setTimeout(resolve.bind(null, data.categories), requestDelay());
  });
}

// Various filters for filtering down products
const filterCategory = id => ({categoryId}) => categoryId === id;

const filterMinPrice = minPrice => ({price}) => price >= minPrice;

const filterMaxPrice = maxPrice => ({price}) => price <= maxPrice;

const filterSearchText = searchText => ({name}) =>
  name.toLowerCase().includes(searchText.toLowerCase());

/**
 * Semi-random delay MS for "requests".
 * @return Number
 */
const requestDelay = () => Math.max(250, Math.ceil(Math.random() * 1500));

const noopTrue = () => true;
