import React from 'react';
import styled from 'styled-components';
import {formatDollar} from '../utils';
import {LoadingSpinner} from './LoadingSpinner';
import {Modal} from './Modal';

const ModalSpinner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`;

const ItemImage = styled.img`
  float: left;
  width: 390px;
  height: 390px;
  margin-right: 30px;
`;

const ItemName = styled.div`
  padding-bottom: 35px;
  font-size: 32px;
`;

const ItemPrice = styled.div`
  font-size: 28px;
  padding-bottom: 20px;
  font-weight: 700;
  color: #F8CB00;
`;

const ItemDescription = styled.p`
  font-size: 20px;
  line-height: 2;
  font-weight: 300;
`;

export const ProductDetailsModal = ({isOpen, close, item}) => {
  return (
    <Modal {...{isOpen, close}}>
      {!item ? (
        <ModalSpinner>
          <LoadingSpinner size="large" />
        </ModalSpinner>
      ) : (
        <div>
          <ItemImage
            src={item.images.large}
            alt={item.name}
          />
          <ItemName>
            {item.name}
          </ItemName>
          <ItemPrice>
            {formatDollar(item.price)}
          </ItemPrice>
          <ItemDescription>
            {item.description}
          </ItemDescription>
        </div>
      )}
    </Modal>
  );
};
