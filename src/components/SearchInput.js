import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 625px;
  height: 50px;
  border-radius: 5px;
  background-color: #FFFFFF;
  font-size: 24px;

  display: flex;
  align-content: center;
  justify-content: center;
`;

const SearchIcon = styled.i`
  color: #5C5C5C;
  width: 25px;
  padding: 10px;
`;

const BigTextInput = styled.input.attrs({
  type: 'text',
})`
  flex: 1;
  width: 200px;
  color: rgba(123,123,123,0.78);
  font-size: 15px;
  float: left;
  border: none;
  border-radius: 5px;
`;

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
        <Wrapper>
          <SearchIcon className="fa fa-search" />
          <BigTextInput
            name="searchText"
            placeholder="Search products by name"
            defaultValue={this.props.searchText || ''}
            onBlur={this.onBlur}
          />
        </Wrapper>
      </form>
    )
  }
}
