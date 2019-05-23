// @flow
import React from 'react';
import cn from 'classnames';
import './Sidebar.css';
import type {Category} from './types';

export function Sidebar({
  categories,
  categoryId,
  setCategoryId,
}: {
  categories: Category[],
  categoryId: number | null,
  setCategoryId: number => mixed,
}) {
  return (
    <div className="sidebar">
      <div className="sidebar__title">All Categories</div>
      <ul className="sidebar__links">
        {categories.map(({id, name}) => (
          <li
            key={name}
            className={cn(
              'sidebar__link',
              id === categoryId && 'sidebar__link--active'
            )}
          >
            <button type="button" onClick={() => setCategoryId(id)}>
              {name}
            </button>
          </li>
        ))}
      </ul>

      {/* TODO: PriceFilter */}
    </div>
  );
}
