import { v4 as uuid } from 'uuid';

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
