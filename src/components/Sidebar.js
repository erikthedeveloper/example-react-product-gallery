import React from 'react';
import styled from 'styled-components';
import {PriceFilter} from './PriceFilter';
import {AddQueryNavLink} from '../utils/routerUtils';

const Wrapper = styled.div`
  width: 290px;
  float: left;
`;

const Links = styled.div`
  list-style: none;
  font-size: 15px;
  padding: 0;
`;

const activeLinkClass = 'LinkItem--active';
const LinkItem = styled(AddQueryNavLink).attrs({
  activeClassName: activeLinkClass,
})`
  padding: 8px 0;

  &, & a {
    display: inline-block;
    color: #818181;
    text-decoration: none;
  }

  &.${activeLinkClass} {
    color: #F8CB00;
  }
`;

const SidebarHeading = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 15px;

  &:nth-child(n + 2) {
    margin-top: 30px;
  }
`;

export const Sidebar = (props) => (
  <Wrapper>
    <SidebarHeading>
      All Categories
    </SidebarHeading>
    <Links>
      {props.categories.map((category, i) => (
        <li key={category.id}>
          <LinkItem
            // Clear out searchText when changing categories.
            queryParams={{categoryId: category.id, q: undefined}}
          >
            {category.name}
          </LinkItem>
        </li>
      ))}
    </Links>

    <SidebarHeading>
      Filter By Price
    </SidebarHeading>

    <PriceFilter
      minPrice={props.minPrice}
      maxPrice={props.maxPrice}
      setPriceFilters={props.setPriceFilters}
    />
  </Wrapper>
);
