import React from 'react';
import styled from 'styled-components';
import {SearchInput} from './SearchInput';
import {Link} from 'react-router-dom';
import {Row} from './layout';

const Wrapper = styled.div`
  min-width: 1182px;
  height: 166px;
  margin-bottom: 30px;
  background-color: #F8CB00;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-top: 6px solid #6364D8;
`;

const FlexRow = Row.extend`
  display: flex;
  align-items: center;
`;

const HeaderLink = styled(Link)`
  width: 290px;
  color: #FFFFFF;
  font-size: 36px;
  font-weight: 900;
  line-height: 33px;
  text-decoration: none;
  
  &:hover {
    color: #F5F5F5;
  }
`;

export const Header = ({searchText, setSearchText}) => (
  <Wrapper>
    <FlexRow>
      <HeaderLink to="/">
        Robots<br />
        &amp; Kittens
      </HeaderLink>
      <SearchInput searchText={searchText} setSearchText={setSearchText} />
    </FlexRow>
  </Wrapper>
);
