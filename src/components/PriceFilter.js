import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {NumberInput} from './NumberInput';

const PriceInput = styled(NumberInput)`
  height: 30px;
  width: 59px;
  margin-right: 10px;
  border: 1px solid #B8B8B8;
  border-radius: 2px;
  text-indent: 8px;
  font-size: 14px;
`;

const Button = styled.button`
  height: 34px;
  width: 91px;
  border-radius: 5px;
  background-color: #F8CB00;
  border: none;
  cursor: pointer;
`;

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

  onBlurForm = () => {
    this.props.setPriceFilters(
      this.form.minPrice.value,
      this.form.maxPrice.value
    );
  };

  render() {
    return (
      <form
        ref={node => this.form = node}
        onSubmit={this.submit}
        onBlur={this.onBlurForm}
      >
        <div className="PriceFilter">
          <PriceInput
            name="minPrice"
            defaultValue={this.props.minPrice}
            placeholder="$ Min"
          />
          <PriceInput
            name="maxPrice"
            defaultValue={this.props.maxPrice}
            placeholder="$ Max"
          />
          <Button>
            Go
          </Button>
        </div>
      </form>
    )
  }
}
