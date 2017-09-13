import * as data from './data';
import {noopTrue} from './utils';
import {getActiveCategoryId, getMaxPrice, getMinPrice, getSearchText} from './utils/routes';;

// Various filters for filtering down products
const filterCategory = (id) => ({categoryId}) =>
  categoryId === id;

const filterMinPrice = (minPrice) => ({price}) =>
  price >= minPrice;

const filterMaxPrice = (maxPrice) => ({price}) =>
  price <= maxPrice;

const filterSearchText = (searchText) => ({name}) =>
  name.toLowerCase().includes(searchText.toLowerCase());

/**
 * Semi-random delay MS for "requests".
 * @return Number
 */
const requestDelay = () => Math.max(250, Math.ceil(Math.random() * 1500));

/**
 * "Request" products given query params
 * @param activeCategoryId
 * @param minPrice
 * @param maxPrice
 * @param searchText
 * @returns {Promise}
 */
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
      .filter(searchText && searchText.length > 0 ? filterSearchText(searchText) : noopTrue);

    setTimeout(resolve.bind(null, filteredItems), requestDelay());
  }) ;
}

/**
 * Make query params from location (all search related state lives in URI)
 * @param {Object} location
 * @returns {Object}
 */
export function productQueryParams(location) {
  return {
    activeCategoryId: getActiveCategoryId(location),
    minPrice: getMinPrice(location),
    maxPrice: getMaxPrice(location),
    searchText: getSearchText(location),
  };
}

/**
 * "Request" categories
 * @returns {Promise}
 */
export function getCategories() {
  return new Promise((resolve) => {
    setTimeout(resolve.bind(null, data.categories), requestDelay());
  }) ;
}


