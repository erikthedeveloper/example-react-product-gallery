import React, {Component} from 'react';

export class PriceFilter extends Component {
  state = {
    minPrice: this.props.minPrice || null,
    maxPrice: this.props.maxPrice || null,
  };

  onInputChange = ({target: {name, value}}) => {
    if (name === 'minPrice')
      this.setState({minPrice: value});

    if (name === 'maxPrice')
      this.setState({maxPrice: value});
  };

  submit = (event) => {
    event.preventDefault();
    this.props.setMinPrice(this.state.minPrice);
    this.props.setMaxPrice(this.state.maxPrice);
  };

  render() {
    const {state} = this;

    return (
      <div className="PriceFilter">
        <form onSubmit={this.submit}>
          <input
            type="number"
            name="minPrice"
            className="PriceFilter__input"
            placeholder="$ Min"
            value={state.minPrice || ''}
            onChange={this.onInputChange}
          />
          <input
            type="number"
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
