import React from 'react';
import PropTypes from 'prop-types';

export class SearchInput extends React.Component {
  static propTypes = {
    searchText: PropTypes.string,
    setSearchText: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const {searchText} = this.props;
    if (prevProps.searchText !== searchText) {
      this.form.searchText.value = searchText || '';
    }
  }

  submit = (event) => {
    event.preventDefault();
    this.props.setSearchText(this.form.searchText.value);
  };

  onBlur = () => {
    if (this.form.searchText.value !== this.props.searchText) {
      this.props.setSearchText(this.form.searchText.value);
    }
  };

  render() {
    return (
      <form onSubmit={this.submit} ref={node => this.form = node}>
        <div className="SearchInput">
          <i className="SearchInput__icon fa fa-search" />
          <input
            type="text"
            name="searchText"
            className="SearchInput__input"
            placeholder="Search products by name"
            defaultValue={this.props.searchText || ''}
            onBlur={this.onBlur}
          />
        </div>
      </form>
    )
  }
}
