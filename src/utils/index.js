/**
 * Removes item from a list based on the id.
 * @param {Object[]} list - list of objects.
 * @param {string} list[].id - unique id.
 * @param {string} itemId - `id` of the item to be remove.
 * @returns {Object[]} - updated list.
 */
export function removeItemById(list, itemId) {
  return list.filter(item => item.id !== itemId);
}
