import React, { useState } from 'react';
import List from '../List';
import defaultState from '../../defaultState';
import './styles.css';
import { removeItemById } from '../../utils/index';

export default function Board() {
  const [boardState, setBoardState] = useState(defaultState);

  function onDragStart(e) {
    e.dataTransfer.setData('draggedCardData', e.currentTarget.id);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

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
        if (originList.id === destinationList.id) return list; // Tragged to the same list, don't update state.
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

  return (
    <div className="board">
      {boardState.map(list => (
        <List
          list={list}
          onDragStart={e => onDragStart(e)}
          onDragOver={e => onDragOver(e)}
          onDrop={e => onDrop(e, list.id)}
          addCard={addCard}
        />
      ))}
    </div>
  );
}
