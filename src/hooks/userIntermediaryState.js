// @flow
import * as React from 'react';

/**
 * Copy value for intermediary state and reset whenever outer value changes
 */
export function useIntermediaryState<S>(initialState: S): [S, (S) => void] {
  const [state, setState] = React.useState<S>(initialState);
  React.useEffect(
    () => {
      setState(initialState);
    },
    [initialState]
  );
  return [state, setState];
}
