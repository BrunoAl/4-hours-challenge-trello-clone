import React from 'react';

export default function Card({ card, list, onDragStart, onDeleteCard }) {
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
      </>
    </div>
  );
}
