// @flow
import * as React from 'react';
import type {Category} from '../types';
import {getCategories} from '../requests';

type State = {
  categories: Category[],
  categoryId: null | number,
  searchText: string,
  priceFilter: {['minPrice' | 'maxPrice']: number | null},
};

type Action =
  | {type: 'FETCH_CATEGORIES', status: 'success', data: Category[]}
  | {type: 'SELECT_CATEGORY', id: number}
  | {
      type: 'UPDATE_SEARCH_CRITERIA',
      searchText?: string,
      priceFilter?: $PropertyType<State, 'priceFilter'>,
    };

const initialState: State = {
  categories: [],
  categoryId: null,
  searchText: '',
  priceFilter: {minPrice: null, maxPrice: null},
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_CATEGORIES':
      if (action.status === 'success') {
        const {data: categories} = action;
        return {...state, categories, categoryId: categories[0].id};
      }
      return state;

    case 'SELECT_CATEGORY':
      return {
        ...state,
        categoryId: action.id,
        searchText: initialState.searchText,
        priceFilter: initialState.priceFilter,
      };

    case 'UPDATE_SEARCH_CRITERIA':
      return {
        ...state,
        searchText:
          typeof action.searchText !== 'undefined'
            ? action.searchText
            : state.searchText,
        priceFilter:
          typeof action.priceFilter !== 'undefined'
            ? action.priceFilter
            : state.priceFilter,
      };

    default:
      return state;
  }
}

// $FlowFixMe Don't care about initial context value
const AppStateContext = React.createContext<State>();
// $FlowFixMe Don't care about initial context value
const AppDispatchContext = React.createContext<(action: Action) => void>();

export function AppProvider({children}: {children: React.Node}) {
  const [state, dispatch] = React.useReducer<State, Action>(
    reducer,
    initialState
  );

  // Request categories
  React.useEffect(
    () => {
      getCategories().then((data: Category[]) => {
        dispatch({
          type: 'FETCH_CATEGORIES',
          status: 'success',
          data,
        });
      });
    },
    [dispatch]
  );

  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
}

export function useAppState() {
  return React.useContext(AppStateContext);
}

export function useAppDispatch() {
  return React.useContext(AppDispatchContext);
}

export function useAppContext() {
  return [useAppState(), useAppDispatch()];
}
