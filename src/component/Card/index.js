import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
      key={card.id}
      // Workaround for drag and drop, I'll try to find a better approach if I have time left in the end.
      id={JSON.stringify({ cardId: card.id, listId: list.id })}
      draggable
      onDragStart={e => onDragStart(e)}
    >
      <>
        {card.title}
        <form className="card__update" onSubmit={onSumbitCardUpdate}>
          <input type="text" value={updateCardInput} onChange={onUpdateCardInput} />
          <button type="submit">Update</button>
        </form>
        <button className="card__delete" onClick={() => onDeleteCard(card.id)}>
          delete
        </button>
      </>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  list: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  onUpdateCard: PropTypes.func.isRequired,
};
