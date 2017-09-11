import qs from 'query-string';

export const getActiveCategoryId = location =>
  Number(qs.parse(location.search).categoryId);
