import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import List from '../List';
import defaultState from '../../defaultState';
import './styles.css';
import { removeItemById } from '../../utils/index';

export default function Board() {
  const [boardState, setBoardState] = useState(
    // Lazy initializer
    () => JSON.parse(window.localStorage.getItem('trellocloneapp')) || defaultState,
  );
  const [newListInput, setNewListInput] = useState('');

  // Presists board state
  useEffect(() => window.localStorage.setItem('trellocloneapp', JSON.stringify(boardState)), [boardState]);

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
    setBoardState(
      boardState.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        }
        return list;
      }),
    );
  }

  function deleteCard(listId, cardId) {
    setBoardState(
      boardState.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: removeItemById(list.cards, cardId),
          };
        }
        return list;
      }),
    );
  }

  function updateCard(listId, cardId, newTitle) {
    setBoardState(
      boardState.map(list => {
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
      }),
    );
  }

  function addNewList() {
    setBoardState([
      ...boardState,
      {
        listName: newListInput,
        id: uuid(),
        cards: [],
      },
    ]);
  }

  function deleteList(listId) {
    setBoardState(removeItemById(boardState, listId));
  }

  const onUpdateNewListInput = e => setNewListInput(e.target.value);

  return (
    <div className="board">
      {boardState.map(list => (
        <List
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
