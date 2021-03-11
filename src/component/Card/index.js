import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { deleteCardFromState, updateCardFromState } from '../../utils/index';

export default function Card({ card, list, setBoardState }) {
  const [updateCardInput, setUpdateCardInput] = useState(card.title);
  const [isEditInputOpen, setisEditInputOpen] = useState(false);

  // Drag and drop function
  function onDragStart(e) {
    e.dataTransfer.setData('draggedCardData', {
      cardId: card.id,
      listId: list.id,
    });
  }

  const onUpdateCardInput = e => setUpdateCardInput(e.target.value);
  const onOpenEditCard = () => setisEditInputOpen(true);
  const onCloseEditCard = () => setisEditInputOpen(false);

  const onDeleteCard = cardId => {
    setBoardState(state => deleteCardFromState(state, list.id, cardId));
  };

  const onUpdateCard = (cardId, newTitle) => {
    setBoardState(state => updateCardFromState(state, list.id, cardId, newTitle));
  };

  const onSumbitCardUpdate = e => {
    e.preventDefault();
    onUpdateCard(card.id, updateCardInput);
    onCloseEditCard();
  };

  return (
    <div className="card" key={card.id} draggable onDragStart={onDragStart}>
      <>
        <form className="card__update" onSubmit={onSumbitCardUpdate}>
          {isEditInputOpen ? (
            <>
              <input type="text" value={updateCardInput} onChange={onUpdateCardInput} />
              <button type="submit">Save</button>
            </>
          ) : (
            <div className="card__title-block">
              <h4 className="card__title">{card.title}</h4>
              <button className="card__edit" onClick={onOpenEditCard}>
                Edit
              </button>
            </div>
          )}
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
  /** dispatcher state function */
  setBoardState: PropTypes.func.isRequired,
};
