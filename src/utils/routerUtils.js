import React from 'react';
import {Route, Link} from 'react-router-dom';
import qs from 'query-string';

export function addQuery(location, queryParams) {
  const search = qs.stringify({
    ...qs.parse(location.search),
    ...queryParams,
  });
  return {...location, search};
}

export function removeQuery(location, key) {
  const search = qs.parse(location.search);
  delete search[key];
  return {...location, search: qs.stringify(search)};
}

export function AddQueryLink({queryParams, ...props}) {
  return (
    <Route render={({location}) => (
      <Link {...props} to={addQuery(location, queryParams)} />
    )} />
  )
}
