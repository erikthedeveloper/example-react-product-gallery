import _ from 'lodash'
import faker from 'faker';

faker.seed(123);

const PRODUCTS_PER_CATEGORY = 14;
let productId = 0;

/**
 * Generate a not-so-random price from an id.
 * @param {Number} id
 * @return Number a floating point number. 2 Decimals max
 */
const generatePrice = (id) =>
  Number(parseFloat(Math.max((id * 175 / 3) % 1500, 1)).toFixed(2));

/**
 * Generate a random product name.
 * @param {Number} id
 * @param {String} category
 * @return String
 */
const generateName = (id, category) =>
  `${faker.commerce.productAdjective()}${id % 3 === 0 ? ' ' + faker.commerce.productAdjective() : ''} ${category.replace(/s(\sv2)?$/, '')}`;

/**
 * Generate a random product description.
 * @param name
 */
const generateDescription = (name) =>
  `The ${name} is ${faker.commerce.productAdjective().toLowerCase()} for ${faker.company.catchPhraseNoun()}. ` + faker.lorem.paragraph();

/**
 * The available product categories.
 * These map to sets on https://robohash.org :)
 * @type {Object[]} An array of category objects
 */
const categories = [
  'Robots',
  'Monsters',
  'Robots v2',
  'Kittens',
].map((name, i) => ({
  id: i + 1,
  name,
}));

/**
 * The generated product data. N-number products per category.
 * @type {Object[]} An array of product objects.
 */
const products = categories.reduce((products, category) => {
  return products.concat(_.range(PRODUCTS_PER_CATEGORY).map(() => {
    productId++;
    const name = generateName(productId, category.name);

    // This is what each product looks like.
    const product = {
      id: productId,
      name: name,
      description: generateDescription(name),
      price: generatePrice(productId),
      images: {
        medium: `https://robohash.org/${productId}?size=175x175&set=set${category.id}`,
        large: `https://robohash.org/${productId}?size=390x390&set=set${category.id}`,
      },
      categoryId: category.id,
    };

    // Append the generated product onto products.
    return product;
  }));
}, []);

export {
  categories,
  products,
};
