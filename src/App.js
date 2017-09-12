import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import {findById} from './utils';
import {Header} from './components/Header';
import {ProductGrid} from './components/ProductGrid';
import {Sidebar} from './components/Sidebar';
import {ProductDetailsModal} from './components/ProductDetailsModal';
import {getCategories, getProducts} from './requests';

class App extends Component {
  static propTypes = {
    requestProducts: PropTypes.func.isRequired,
    requestCategories: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,

    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })),

    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      images: PropTypes.shape({
        medium: PropTypes.string.isRequired,
        large: PropTypes.string.isRequired,
      }),
      categoryId: PropTypes.number.isRequired,
    }))
  };

  static defaultProps = {
    categories: [],
    products: [],
  };

  state = {
    activeCategoryId: null,

    minPrice: null,
    maxPrice: null,

    searchText: '',

    viewingItemId: null,
  };

  componentDidMount() {
    this.props.requestCategories();
  }

  componentDidUpdate(prevProps) {
    // We can't set a default category id until we have categories! ...there must be a better way?
    if (prevProps.categories.length === 0 && this.props.categories.length > 0) {
      this.setState(
        {activeCategoryId: this.props.categories[0].id},
        // We can't request products until we have a category! ...there must be a better way?
        this.requestProducts
      )
    }
  }

  requestProducts = () => {
    this.props.requestProducts({
      activeCategoryId: this.state.activeCategoryId,
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice,
      searchText: this.state.searchText,
    });
  };

  setActiveCategoryId = (activeCategoryId) => this.setState({activeCategoryId}, this.requestProducts);

  setMinPrice = (minPrice) => this.setState({minPrice}, this.requestProducts);
  setMaxPrice = (maxPrice) => this.setState({maxPrice}, this.requestProducts);

  setSearchText = (searchText) => this.setState({searchText}, this.requestProducts);

  onClickItem = (viewingItemId) => () => {
    this.setState({viewingItemId});
  };

  closeProductDetails = () => this.setState({viewingItemId: null});

  render() {
    const {props, state} = this;

    const viewingItem = state.viewingItemId ? findById(props.products, state.viewingItemId) : null;
    const activeCategory = findById(props.categories, state.activeCategoryId);
    if (!activeCategory) {
      return null;
    }

    return (
      <div>
        <Header
          searchText={state.searchText}
          setSearchText={this.setSearchText}
        />

        <div className="content">
          <ProductDetailsModal
            isOpen={Boolean(viewingItem)}
            close={this.closeProductDetails}
            item={viewingItem}
          />

          <div className="primary-flex">
            <Sidebar
              categories={props.categories}
              activeCategoryId={state.activeCategoryId}
              setActiveCategoryId={this.setActiveCategoryId}
              minPrice={state.minPrice}
              setMinPrice={this.setMinPrice}
              maxPrice={state.maxPrice}
              setMaxPrice={this.setMaxPrice}
            />

            <div className="primary-content">
              <ProductGrid
                title={activeCategory.name}
                items={this.props.products}
                loading={this.props.loading}
                onClickItem={this.onClickItem}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default class AppContainer extends React.Component {
  state = {
    loading: false,
    products: undefined,
    categories: undefined,
  };

  requestProducts = async (...args) => {
    this.setState({loading: true});
    const products = await getProducts(...args);
    this.setState({
      products,
      loading: false,
    })
  };

  requestCategories = async () => {
    this.setState({
      categories: await getCategories(),
    });
  };

  render() {
    const props = {
      ...this.state,
      requestProducts: this.requestProducts,
      requestCategories: this.requestCategories,
    };

    return <App {...props} />;
  }
}
