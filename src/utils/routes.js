import qs from 'query-string';
import {toNumber} from '../utils';

export const getActiveCategoryId = location =>
  Number(qs.parse(location.search).categoryId);

export const getMinPrice = location =>
  toNumber(qs.parse(location.search).minPrice);

export const getMaxPrice = location =>
  toNumber(qs.parse(location.search).maxPrice);
