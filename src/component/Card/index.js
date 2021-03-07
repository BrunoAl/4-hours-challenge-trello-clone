import React, { useState } from 'react';

export default function Card({ card, list, onDragStart, onDeleteCard, onUpdateCard }) {
  const [updateCardInput, setUpdateCardInput] = useState('');

  const onUpdateCardInput = e => setUpdateCardInput(e.target.value);

  const onSumbitCardUpdate = e => {
    e.preventDefault();
    onUpdateCard(card.id, updateCardInput);
    setUpdateCardInput('');
  };

  return (
    <div
      className="card"
      key={card.title}
      // Workaround, I'll try to find a better approach if I have time left in the end.
      id={JSON.stringify({ cardId: card.id, listId: list.id })}
      draggable
      onDragStart={e => onDragStart(e)}
    >
      <>
        {card.title}
        <button onClick={() => onDeleteCard(card.id)}>delete</button>
        <form onSubmit={onSumbitCardUpdate}>
          <input type="text" value={updateCardInput} onChange={onUpdateCardInput} />
          <button type="submit">Update</button>
        </form>
      </>
    </div>
  );
}
