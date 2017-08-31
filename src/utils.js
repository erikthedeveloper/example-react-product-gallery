export const stopPropagation = (event) => {event.stopPropagation()};
export const formatDollar = float => `$${parseFloat(float).toFixed(2)}`;
export const noopTrue = () => true;

/**
 * Find an item by id
 * @param {{id: Number}[]} items
 * @param {Number} id
 * @return Object|null
 */
export const findById = (items, id) => items.find(item => item.id === id);
