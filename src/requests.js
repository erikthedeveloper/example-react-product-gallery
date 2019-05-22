import * as data from './data';

/**
 * "Request" products given query params
 * @param categoryId
 * @param minPrice
 * @param maxPrice
 * @param searchText
 * @returns {Promise}
 */
export async function getProducts({
  categoryId,
  minPrice,
  maxPrice,
  searchText,
}) {
  const filteredItems = data.products
    .filter(filterCategory(categoryId))
    .filter(minPrice ? filterMinPrice(minPrice) : noopTrue)
    .filter(maxPrice ? filterMaxPrice(maxPrice) : noopTrue)
    .filter(
      searchText && searchText.length > 0
        ? filterSearchText(searchText)
        : noopTrue
    );

  await requestDelay();
  return filteredItems;
}

/**
 * "Request" a single product by id.
 * @param id
 * @returns {Promise}
 */
export async function getProduct(id) {
  const item = data.products.find(item => item.id === id);
  await requestDelay();
  return item;
}

/**
 * "Request" categories
 * @returns {Promise}
 */
export async function getCategories() {
  await requestDelay();
  return data.categories;
}

// Various filters for filtering down products
const filterCategory = id => ({categoryId}) => categoryId === id;

const filterMinPrice = minPrice => ({price}) => price >= minPrice;

const filterMaxPrice = maxPrice => ({price}) => price <= maxPrice;

const filterSearchText = searchText => ({name}) =>
  name.toLowerCase().includes(searchText.toLowerCase());

/**
 * Semi-random delay for "requests".
 * @return Promise
 */
const requestDelay = () =>
  new Promise(resolve => {
    setTimeout(resolve, Math.max(250, Math.ceil(Math.random() * 1500)));
  });

const noopTrue = () => true;
