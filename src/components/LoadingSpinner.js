import React from 'react';
import styled, {css} from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  font-size: 48px;

  ${({size}) => size === 'large' && css`
    font-size: 172px;
  `}
`;

export const LoadingSpinner = (props) => (
  <Wrapper {...props}>
    <i className="fa fa-cog fa-spin fa-fw" />
    <span className="sr-only">Loading...</span>
  </Wrapper>
);
