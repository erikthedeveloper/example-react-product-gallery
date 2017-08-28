import _ from 'lodash'

const NUM_CATEGORIES = 4;
const PRODUCTS_PER_CATEGORY = 8;

const categories = _.range(NUM_CATEGORIES).map(i => ({
  id: i + 1,
  name: `Category ${i + 1}`,
}));

const dummyPrice = (id) => Number(parseFloat(id * 4 % 50).toFixed(2));

let productId = 0;
const products = categories.reduce((products, category) => {
  return _.shuffle([
    ...products,
    ..._.range(PRODUCTS_PER_CATEGORY).map(() => ({
      id: productId++,
      name: `Product ${productId}`,
      price: dummyPrice(productId),
      images: {
        medium: `https://robohash.org/Product%20${productId}?size=175x175`,
        large: `https://robohash.org/Product%20${productId}?size=390x390`,
      },
      categoryId: category.id,
    })),
  ]);
}, []);

export {
  categories,
  products,
};
