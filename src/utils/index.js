import { v4 as uuid } from 'uuid';

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

// TODO: Add JSDOC and tests.
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

// TODO: Add JSDOC and tests.
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

// TODO: Add JSDOC and tests.
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

// TODO: Add JSDOC and tests.
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

// TODO: Add JSDOC and tests.
export function updateLists(state, cardInfo, targetList) {
  const { cardId, listId } = cardInfo;

  const originList = state.find(listValue => listValue.id === listId);
  const destinationList = state.find(listValue => listValue.id === targetList);

  const updatedOriginList = {
    ...originList,
    cards: removeItemById(originList.cards, cardId),
  };
  const updatedDestinationList = {
    ...destinationList,
    cards: [...destinationList.cards, originList.cards.find(item => item.id === cardId)],
  };

  return state.map(listValue => {
    if (originList.id === destinationList.id) return listValue; // Dragged to the same list, don't update state.
    if (listValue.id === originList.id) return updatedOriginList;
    if (listValue.id === destinationList.id) return updatedDestinationList;
    return listValue;
  });
}
