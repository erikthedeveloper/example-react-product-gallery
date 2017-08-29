import _ from 'lodash'
import faker from 'faker';

faker.seed(123);

const PRODUCTS_PER_CATEGORY = 14;

// These map to sets on robohash.org :)
const categories = [
  'Robots',
  'Monsters',
  'Robots v2',
  'Kittens',
].map((name, i) => ({
  id: i + 1,
  name,
}));

const dummyPrice = (id) => Number(parseFloat(
  Math.max(id * 4 % 50, 1)
).toFixed(2));

let productId = 0;
const products = categories.reduce((products, category) => {
  return [
    ...products,
    ..._.range(PRODUCTS_PER_CATEGORY).map((_, i) => {
      const name = `${faker.commerce.productAdjective()}${i % 3 === 0 ? ' ' + faker.commerce.productAdjective() : ''} ${category.name.replace(/s(\sv2)?$/, '')}`;
      return ({
        id: ++productId,
        name: name,
        description: `The ${name} is ${faker.commerce.productAdjective().toLowerCase()} for ${faker.company.catchPhraseNoun()}. ` + faker.lorem.paragraph(),
        price: dummyPrice(productId),
        images: {
          medium: `https://robohash.org/${productId}?size=175x175&set=set${category.id}`,
          large: `https://robohash.org/${productId}?size=390x390&set=set${category.id}`,
        },
        categoryId: category.id,
      });
    }),
  ];
}, []);

export {
  categories,
  products,
};
