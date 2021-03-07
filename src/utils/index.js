export function removeItemById(list, itemId) {
  return list.filter(item => item.id !== itemId);
}
