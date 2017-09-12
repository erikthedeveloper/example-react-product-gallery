import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './PriceFilter.css';
import {NumberInput} from './NumberInput';

export class PriceFilter extends Component {
  static propTypes = {
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    setPriceFilters: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const {minPrice, maxPrice} = this.props;
    if (
      prevProps.minPrice !== minPrice ||
      prevProps.maxPrice !== maxPrice
    ) {
      this.form.minPrice.value = minPrice || '';
      this.form.maxPrice.value = maxPrice || '';
    }
  }

  submit = (event) => {
    event.preventDefault();
    this.props.setPriceFilters(
      this.form.minPrice.value,
      this.form.maxPrice.value
    );
  };

  render() {
    return (
      <form onSubmit={this.submit} ref={node => this.form = node}>
        <div className="PriceFilter">
          <NumberInput
            name="minPrice"
            defaultValue={this.props.minPrice}
            placeholder="$ Min"
            className="PriceFilter__input"
          />
          <NumberInput
            name="maxPrice"
            defaultValue={this.props.maxPrice}
            placeholder="$ Max"
            className="PriceFilter__input"
          />
          <button className="Button Button--primary" type={this.submit}>
            Go
          </button>
        </div>
      </form>
    )
  }
}
