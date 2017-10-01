import qs from 'query-string';
import {toNumber} from '../utils';

export const getActiveCategoryId = location =>
  toNumber(qs.parse(location.search).categoryId);

export const getActiveItemId = location =>
  toNumber(qs.parse(location.search).itemId);

export const getMinPrice = location =>
  toNumber(qs.parse(location.search).minPrice);

export const getMaxPrice = location =>
  toNumber(qs.parse(location.search).maxPrice);

export const getSearchText = location =>
  qs.parse(location.search).q;
