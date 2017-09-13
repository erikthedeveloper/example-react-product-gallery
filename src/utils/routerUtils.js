import React from 'react';
import {Route, Link, NavLink} from 'react-router-dom';
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
  );
}

export function AddQueryNavLink({queryParams, ...props}) {
  return (
    <Route render={({location}) => {
      const to = addQuery(location, queryParams);
      const toQuery = qs.parse(to.search);
      const currentQuery = qs.parse(location.search);

      /**
       * Ensure that each of the link params are present on the current location.
       */
      const queryIsActive = () => Object.keys(queryParams)
        .every(key => (
          // Enable "omission" of undesired keys
          typeof toQuery[key] === 'undefined' ||
          // Ensure every desired key matches
          Object.hasOwnProperty.call(currentQuery, key) &&
          currentQuery[key] === toQuery[key]
        ));

      return <NavLink {...props} to={to} isActive={queryIsActive} />;
    }} />
  );
}
