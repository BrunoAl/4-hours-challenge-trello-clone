import { v4 as uuid } from 'uuid';

/**
 * Removes item from a list based on the id.
 * @param {Object[]} list - list of objects.
 * @param {string} list[].id - unique id.
 * @param {*} itemId - `id` of the item to be remove.
 * @returns {Object[]} - updated list.
 */
export function removeItemById(list, itemId) {
  return list.filter(item => item.id !== itemId);
}

// TODO: Add JSDOC and test all these utilities functions.
export function addCardToState(state, listId, newCard) {
  return state.map(list => {
    if (list.id === listId) {
      return {
        ...list,
        cards: [...list.cards, newCard],
      };
    }
    return list;
  });
}

export function deleteCardFromState(state, listId, cardId) {
  return state.map(list => {
    if (list.id === listId) {
      return {
        ...list,
        cards: removeItemById(list.cards, cardId),
      };
    }
    return list;
  });
}

export function updateCardFromState(state, listId, cardId, newTitle) {
  return state.map(list => {
    if (list.id === listId) {
      return {
        ...list,
        cards: list.cards.map(card => {
          if (card.id === cardId) {
            return {
              ...card,
              title: newTitle,
            };
          }
          return card;
        }),
      };
    }
    return list;
  });
}

export function addNewListToState(state, listName) {
  return [
    ...state,
    {
      listName,
      id: uuid(),
      cards: [],
    },
  ];
}
