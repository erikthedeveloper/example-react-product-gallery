import React from 'react';
import styled, {css} from 'styled-components';
import {formatDollar} from '../utils';
import {AddQueryLink} from '../utils/routerUtils';
import {LoadingSpinner} from './LoadingSpinner';

const Wrapper = styled.div`
  opacity: 1;
  transition: all 200ms;

  ${props =>
    props.loading &&
    css`
      opacity: 0.7;
    `};
`;

const PrimaryHeading = styled.h1`
  font-size: 27px;
  margin-bottom: 30px;
  font-weight: 300;
`;

const BigText = styled.p`
  font-size: 40px;
  font-weight: 300;
  margin-top: 30px;
`;

const GridItem = styled.div`
  display: inline-block;
  margin-right: 25px;
  box-sizing: border-box;
  margin-bottom: 35px;

  &:nth-of-type(4n) {
    margin-right: 0;
  }
`;

const ProductGridItem = styled(AddQueryLink)`
  padding: 10px 5px;
  cursor: pointer;
  text-align: center;
  height: 300px;
  width: 180px;
  border: 2px solid #e4e4e4;
  border-radius: 4px;
  box-shadow: 0 4px 14px 7px rgba(121, 121, 121, 0.05);
  transition: 150ms;

  /* Since we know this is a link */
  &,
  &.a {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  &:hover {
    box-shadow: 0 4px 14px 7px rgba(121, 121, 121, 0.1);
    border: 2px solid #f8cb00;
  }
`;

const ItemImage = styled.img`
  height: 175px;
  width: 175px;
`;

const ItemName = styled.div`
  font-size: 18px;
  padding-top: 20px;
  height: 60px;
`;

const ItemPrice = styled.div`
  color: #f8cb00;
  font-size: 20px;
`;

export const ProductGrid = props => (
  <Wrapper loading={props.loading}>
    <PrimaryHeading>{props.title}</PrimaryHeading>
    {props.items.length === 0 &&
      (props.loading ? (
        <LoadingSpinner />
      ) : (
        <BigText>No items found...</BigText>
      ))}
    {props.items.map(item => (
      <GridItem key={item.id}>
        <ProductGridItem queryParams={{itemId: item.id}}>
          <ItemImage src={item.images.medium} alt={item.name} />
          <ItemName>{item.name}</ItemName>
          <ItemPrice>{formatDollar(item.price)}</ItemPrice>
        </ProductGridItem>
      </GridItem>
    ))}
  </Wrapper>
);
