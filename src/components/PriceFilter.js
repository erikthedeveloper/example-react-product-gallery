import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './PriceFilter.css';
import {toNumber} from '../utils';

export class PriceFilter extends Component {
  static propTypes = {
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    setPriceFilters: PropTypes.func.isRequired,
  };

  state = {
    minPrice: this.props.minPrice,
    maxPrice: this.props.maxPrice,
  };

  componentWillReceiveProps(nextProps) {
    const {minPrice, maxPrice} = nextProps;
    if (
      nextProps.minPrice !== this.props.minPrice ||
      nextProps.maxPrice !== this.props.maxPrice
    ) {
      this.setState({minPrice, maxPrice});
    }
  }

  onInputChange = ({target: {name, value}}) => {
    this.setState({[name]: toNumber(value)});
  };

  submit = (event) => {
    event.preventDefault();
    this.props.setPriceFilters(this.state.minPrice, this.state.maxPrice);
  };

  render() {
    const {state} = this;

    return (
      <div className="PriceFilter">
        <form onSubmit={this.submit}>
          <input
            type="number"
            step="0.01"
            min={0}
            name="minPrice"
            className="PriceFilter__input"
            placeholder="$ Min"
            value={state.minPrice || ''}
            onChange={this.onInputChange}
          />
          <input
            type="number"
            step="0.01"
            min={0}
            name="maxPrice"
            className="PriceFilter__input"
            placeholder="$ Max"
            value={state.maxPrice || ''}
            onChange={this.onInputChange}
          />
          <button className="Button Button--primary" type={this.submit}>
            Go
          </button>
        </form>
      </div>
    )
  }
}
