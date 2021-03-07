import React, { useState } from 'react';
import Card from '../Card';
import { v4 as uuid } from 'uuid';

export default function List({ list, onDragOver, onDrop, onDragStart, addCard }) {
  const [addCardInput, setAddCardInput] = useState('');
  const updateCardInput = e => setAddCardInput(e.target.value);

  const onAddNewCard = () => {
    addCard(list.id, { title: addCardInput, id: uuid() });
    setAddCardInput('');
  };

  return (
    <div className="list" onDragOver={e => onDragOver(e)} onDrop={e => onDrop(e, list.id)}>
      <h3 className="list-title ">{list.listName}</h3>
      {list.cards.map(card => (
        <Card card={card} list={list} onDragStart={onDragStart} />
      ))}
      <div>
        <input type="text" value={addCardInput} onChange={updateCardInput} />
        <button onClick={onAddNewCard}>Add</button>
      </div>
    </div>
  );
}
