import React from 'react';
import styled from 'styled-components';
import {stopPropagation} from '../utils';

const ModalWrapper = styled.div`
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

export function Modal(props) {
  return !props.isOpen ? null : (
    <ModalWrapper onClick={props.close}>
      <ModalContents onClick={stopPropagation}>
        <ModalX onClick={props.close} />
        {props.children}
      </ModalContents>
    </ModalWrapper>
  );
}
