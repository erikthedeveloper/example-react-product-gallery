import React from 'react';

export function NumberInput(props) {
  return (
    <input
      step="0.01"
      min={0}
      {...props}
      type="number"
      defaultValue={props.defaultValue || ''}
    />
  )
}
