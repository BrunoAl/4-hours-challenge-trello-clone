import React from 'react';
import Card from '../Card';

export default function List({ list }) {
  return (
    <div className="list">
      <h3 className="list-title ">{list.listName}</h3>
      {list.cards.map(card => (
        <Card card={card} list={list} />
      ))}
    </div>
  );
}
