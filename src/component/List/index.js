import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import Card from '../Card';
import {
  removeItemById,
  addCardToState,
  deleteCardFromState,
  updateCardFromState,
  updateLists,
} from '../../utils/index';

export default function List({ list, setBoardState }) {
  const [addCardInput, setAddCardInput] = useState('');
  const updateCardInput = e => setAddCardInput(e.target.value);

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
    setBoardState(state => updateLists(state, JSON.parse(cardInfo), targetList));
  }

  const onAddNewCard = e => {
    e.preventDefault();
    setBoardState(state => addCardToState(state, list.id, { title: addCardInput, id: uuid() }));
    setAddCardInput('');
  };

  const onDeleteCard = cardId => {
    setBoardState(state => deleteCardFromState(state, list.id, cardId));
  };

  const onUpdateCard = (cardId, newTitle) => {
    setBoardState(state => updateCardFromState(state, list.id, cardId, newTitle));
  };

  function deleteList(listId) {
    setBoardState(state => removeItemById(state, listId));
  }

  return (
    <div className="list" onDragOver={onDragOver} onDrop={e => onDrop(e, list.id)}>
      <h3 className="list-title ">{list.listName}</h3>
      {list.cards.map(card => (
        <Card
          key={card.id}
          card={card}
          list={list}
          onDragStart={onDragStart}
          onDeleteCard={onDeleteCard}
          onUpdateCard={onUpdateCard}
        />
      ))}
      <form className="list__add-card" onSubmit={onAddNewCard}>
        <input type="text" value={addCardInput} onChange={updateCardInput} />
        <button type="submit">Add card</button>
      </form>

      <button className="list__delete" onClick={() => deleteList(list.id)}>
        Delete list
      </button>
    </div>
  );
}

List.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.string,
    listName: PropTypes.string,
    cards: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  /** dispatcher state function */
  setBoardState: PropTypes.func.isRequired,
};
