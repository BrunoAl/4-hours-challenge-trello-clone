import React from 'react';
import Card from '../Card';

export default function List({ list, onDragOver, onDrop, onDragStart }) {
  return (
    <div className="list" onDragOver={e => onDragOver(e)} onDrop={e => onDrop(e, list.id)}>
      <h3 className="list-title ">{list.listName}</h3>
      {list.cards.map(card => (
        <Card card={card} list={list} onDragStart={onDragStart} />
      ))}
    </div>
  );
}
