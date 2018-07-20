import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {AppLayout} from './components/AppLayout';
import {getActiveCategoryId} from './utils/routes';
import {addQuery, removeQuery} from './utils/routerUtils';
import {getCategories, getProducts, productQueryParams} from './requests';
import qs from 'query-string';

class App extends Component {
  state = {
    loading: false,
    products: [],
    categories: [],
  };

  componentDidMount() {
    this.initialRequest();
  }

  componentDidUpdate(prevProps) {
    const {location} = this.props;

    // Did the relevant query params change? All relevant state is held in URI
    if (
      qs.stringify(productQueryParams(prevProps.location)) !==
      qs.stringify(productQueryParams(location))
    ) {
      this.requestProducts();
    }
  }

  initialRequest = async () => {
    await this.requestCategories();
    this.requestProducts();
  };

  requestProducts = async () => {
    this.setState({loading: true});
    this.setState({
      products: await getProducts(productQueryParams(this.props.location)),
      loading: false,
    });
  };

  requestCategories = async () => {
    this.setState({loading: true});
    this.setState({
      categories: await getCategories(),
      loading: false,
    });
  };

  setPriceFilters = (minPrice, maxPrice) => {
    let {location} = this.props;

    location = minPrice
      ? addQuery(location, {minPrice})
      : removeQuery(location, 'minPrice');

    location = maxPrice
      ? addQuery(location, {maxPrice})
      : removeQuery(location, 'maxPrice');

    this.props.history.push(location);
  };

  setSearchText = q => {
    this.props.history.push(
      q.trim()
        ? addQuery(this.props.location, {q})
        : removeQuery(this.props.location, 'q')
    );
  };

  render() {
    const props = {
      ...this.props,
      ...this.state,
      setPriceFilters: this.setPriceFilters,
      setSearchText: this.setSearchText,
    };

    return (
      <div>
        <EnsureCategoryRedirect {...props} />
        <AppLayout {...props} />
      </div>
    );
  }
}

/**
 * Append categoryId to the location if necessary via Redirect
 */
function EnsureCategoryRedirect({categories, location}) {
  const locationCategoryId = getActiveCategoryId(location);
  const shouldRedirect =
    // categories are loaded AND
    categories.length > 0 &&
    // No category selected OR
    (!locationCategoryId ||
      // Attempting to visit invalid category.
      !categories.some(({id}) => id === locationCategoryId));

  return shouldRedirect ? (
    <Redirect to={addQuery(location, {categoryId: categories[0].id})} />
  ) : null;
}

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/products"
          render={routeProps => <App {...routeProps} />}
        />
        <Redirect to="/products" />
      </Switch>
    </BrowserRouter>
  );
}
