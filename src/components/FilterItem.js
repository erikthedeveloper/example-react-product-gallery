// @flow
import * as React from 'react';

export function FilterItem({
  children,
  resetFilter,
}: {
  children: React.Node,
  resetFilter: () => void,
}) {
  return (
    <small style={{marginRight: 5}}>
      {children}{' '}
      <button className="button-reset" onClick={resetFilter}>
        x
      </button>
    </small>
  );
}
