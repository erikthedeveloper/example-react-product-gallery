// @flow
import * as React from 'react';
import type {Category, Product} from '../types';

type State = {
  categories: Category[],
  categoryId: null | number,
  activeProductId: null | number,
  activeProduct: null | Product,
  activeProductLoading: boolean,
  searchText: string,
  priceFilter: {['minPrice' | 'maxPrice']: number | null},
};

type Action =
  | {type: 'FETCH_CATEGORIES', status: 'success', data: Category[]}
  | {type: 'SELECT_CATEGORY', id: number}
  | {type: 'SELECT_PRODUCT', id: number}
  | {type: 'DESELECT_PRODUCT'}
  | {type: 'FETCH_PRODUCT', status: 'begin', id: number}
  | {type: 'FETCH_PRODUCT', status: 'success', id: number, data: Product}
  | {
      type: 'UPDATE_SEARCH_CRITERIA',
      searchText?: string,
      priceFilter?: $PropertyType<State, 'priceFilter'>,
    };

const initialState: State = {
  categories: [],
  categoryId: null,
  activeProductId: null,
  activeProduct: null,
  activeProductLoading: false,
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

    case 'SELECT_PRODUCT':
      return {
        ...state,
        activeProductId: action.id,
      };

    case 'DESELECT_PRODUCT':
      return {
        ...state,
        activeProductId: null,
        activeProduct: null,
      };

    case 'FETCH_PRODUCT':
      if (action.status === 'begin') {
        return {
          ...state,
          activeProductLoading: true,
        };
      }
      if (action.status === 'success') {
        const {data: activeProduct} = action;
        return {...state, activeProduct, activeProductLoading: false};
      }
      return state;

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
