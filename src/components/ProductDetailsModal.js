import React from 'react';
import styled from 'styled-components';
import {formatDollar, stopPropagation} from '../utils';
import {LoadingSpinner} from './LoadingSpinner';

const Modal = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255,255,255,0.86);
  z-index: 10;
`;

const ModalX = styled.div.attrs({
  className: 'fa fa-times',
})`
  position: fixed;
  top: 0;
  right: 0;
  padding: 30px;
  font-size: 48px;
  color: #818181;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const ModalContents = styled.div`
  position: relative;
  top: 20%;
  min-height: 400px;
  padding: 100px 60px;
  width: 850px;
  margin: 0 auto;
  background: #FFF;
  border-radius: 10px;
  box-shadow: 0 4px 14px 7px rgba(121, 121, 121, 0.10);
`;

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
  return !isOpen ? null : (
    <Modal onClick={close}>
      <ModalContents onClick={stopPropagation}>
        <ModalX onClick={close} />

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

      </ModalContents>
    </Modal>
  )
};
