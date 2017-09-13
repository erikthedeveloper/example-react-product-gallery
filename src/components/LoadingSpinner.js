import React from 'react';
import './LoadingSpinner.css';

export const LoadingSpinner = (props) => (
  <div className={`LoadingSpinner ${props.size === 'large' ? 'LoadingSpinner--large' : ''}`}>
    <i className="fa fa-cog fa-spin fa-fw" />
    <span className="sr-only">Loading...</span>
  </div>
);
