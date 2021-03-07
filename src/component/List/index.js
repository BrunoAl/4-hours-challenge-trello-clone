import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import Card from '../Card';

export default function List({ list, onDragOver, onDrop, onDragStart, addCard, deleteCard, updateCard, deleteList }) {
  const [addCardInput, setAddCardInput] = useState('');
  const updateCardInput = e => setAddCardInput(e.target.value);

  const onAddNewCard = e => {
    e.preventDefault();
    addCard(list.id, { title: addCardInput, id: uuid() });
    setAddCardInput('');
  };

  const onDeleteCard = cardId => {
    deleteCard(list.id, cardId);
  };

  const onUpdateCard = (cardId, newTitle) => {
    updateCard(list.id, cardId, newTitle);
  };

  return (
    <div className="list" onDragOver={e => onDragOver(e)} onDrop={e => onDrop(e, list.id)}>
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
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  updateCard: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
};
