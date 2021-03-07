import React, { useState, useEffect } from 'react';
import List from '../List';
import defaultState from '../../defaultState';
import './styles.css';
import {
  removeItemById,
  addCardToState,
  deleteCardFromState,
  updateCardFromState,
  addNewListToState,
} from '../../utils/index';

export default function Board() {
  const [boardState, setBoardState] = useState(
    // Lazy initializer
    () => JSON.parse(window.localStorage.getItem('bruno-trello-clone-app')) || defaultState,
  );
  const [newListInput, setNewListInput] = useState('');

  // Presists board state
  useEffect(() => window.localStorage.setItem('bruno-trello-clone-app', JSON.stringify(boardState)), [boardState]);

  // Drag and drop function
  function onDragStart(e) {
    e.dataTransfer.setData('draggedCardData', e.currentTarget.id);
  }

  // Drag and drop function
  function onDragOver(e) {
    e.preventDefault();
  }

  // Drag and drop function
  function onDrop(e, targetList) {
    e.preventDefault();
    const cardInfo = e.dataTransfer.getData('draggedCardData');

    const { cardId, listId } = JSON.parse(cardInfo);

    const originList = boardState.find(list => list.id === listId);
    const destinationList = boardState.find(list => list.id === targetList);

    const updateOriginList = {
      ...originList,
      cards: removeItemById(originList.cards, cardId),
    };
    const updatedDestinationList = {
      ...destinationList,
      cards: [...destinationList.cards, originList.cards.find(item => item.id === cardId)],
    };

    setBoardState(
      boardState.map(list => {
        if (originList.id === destinationList.id) return list; // Dragged to the same list, don't update state.
        if (list.id === originList.id) return updateOriginList;
        if (list.id === destinationList.id) return updatedDestinationList;
        return list;
      }),
    );
  }

  function addCard(listId, newCard) {
    setBoardState(addCardToState(boardState, listId, newCard));
  }

  function deleteCard(listId, cardId) {
    setBoardState(deleteCardFromState(boardState, listId, cardId));
  }

  function updateCard(listId, cardId, newTitle) {
    setBoardState(updateCardFromState(boardState, listId, cardId, newTitle));
  }

  function addNewList() {
    setBoardState(addNewListToState(boardState, newListInput));
  }

  function deleteList(listId) {
    setBoardState(removeItemById(boardState, listId));
  }

  const onUpdateNewListInput = e => setNewListInput(e.target.value);

  return (
    <div className="board">
      {boardState.map(list => (
        <List
          key={list.id}
          list={list}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={e => onDrop(e, list.id)}
          addCard={addCard}
          deleteCard={deleteCard}
          updateCard={updateCard}
          deleteList={deleteList}
        />
      ))}
      <form onSubmit={addNewList}>
        <input type="text" value={newListInput} onChange={onUpdateNewListInput} />
        <button type="submit">Add list</button>
      </form>
    </div>
  );
}
