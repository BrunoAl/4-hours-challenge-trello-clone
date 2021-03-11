import { removeItemById } from '../../utils';

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
