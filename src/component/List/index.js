import React, { useState } from 'react';
import Card from '../Card';
import { v4 as uuid } from 'uuid';

export default function List({ list, onDragOver, onDrop, onDragStart, addCard, deleteCard, updateCard }) {
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
    </div>
  );
}
