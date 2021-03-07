/**
 * Removes item from a list based on the id.
 * @param {Object[]} list - list of object with a unique `id` key.
 * @param {*} itemId - `id` of the item to be remove
 */
export function removeItemById(list, itemId) {
  return list.filter(item => item.id !== itemId);
}
