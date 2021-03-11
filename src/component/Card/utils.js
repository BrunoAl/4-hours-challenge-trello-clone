import { removeItemById } from '../../utils';

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
