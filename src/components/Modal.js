// @flow
import * as React from 'react';
import './Modal.css';

export function Modal({
  isOpen,
  close,
  children,
}: {
  isOpen: boolean,
  close: () => void,
  children: React.Node,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="Modal">
        <button className="button-reset Modal__close" onClick={close}>
          &times;
        </button>
        <div className="Modal__contents">{children}</div>
      </div>
    </div>
  );
}
