// @flow
export type Category = {id: number, name: string};
export type Product = {
  id: number,
  name: string,
  description: string,
  price: number,
  images: {
    medium: string,
    large: string,
  },
  categoryId: number,
};
