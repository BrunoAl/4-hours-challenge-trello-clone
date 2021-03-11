import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import Card from '../Card';
import { addCardToState, updateLists } from './utils';
import { removeItemById } from '../../utils';

export default function List({ list, setBoardState }) {
  const [addCardInput, setAddCardInput] = useState('');
  const updateCardInput = e => setAddCardInput(e.target.value);

  // Drag and drop function
  function onDragOver(e) {
    e.preventDefault();
  }

  // Drag and drop function
  function onDrop(e, targetList) {
    e.preventDefault();
    const cardInfo = JSON.parse(e.dataTransfer.getData('draggedCardData'));
    setBoardState(state => updateLists(state, cardInfo, targetList));
  }

  const onAddNewCard = e => {
    e.preventDefault();
    setBoardState(state => addCardToState(state, list.id, { title: addCardInput, id: uuid() }));
    setAddCardInput('');
  };

  function deleteList(listId) {
    setBoardState(state => removeItemById(state, listId));
  }

  return (
    <div className="list" onDragOver={onDragOver} onDrop={e => onDrop(e, list.id)}>
      <h2 className="list-title ">{list.listName}</h2>
      {list.cards.map(card => (
        <Card key={card.id} card={card} listId={list.id} setBoardState={setBoardState} />
      ))}
      <form className="list__add-card" onSubmit={onAddNewCard}>
        <input aria-label="add new card" type="text" value={addCardInput} onChange={updateCardInput} />
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
