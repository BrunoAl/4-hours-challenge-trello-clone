import React, { useState, useEffect } from 'react';
import List from '../List';
import defaultState from '../../defaultState';
import './styles.css';
import { addNewListToState } from '../../utils/index';

export default function Board() {
  const [boardState, setBoardState] = useState(
    // Lazy initializer
    () => JSON.parse(window.localStorage.getItem('bruno-trello-clone-app')) || defaultState,
  );
  const [newListInput, setNewListInput] = useState('');

  // Presists board state
  useEffect(() => window.localStorage.setItem('bruno-trello-clone-app', JSON.stringify(boardState)), [boardState]);

  function addNewList() {
    setBoardState(state => addNewListToState(state, newListInput));
  }

  const onUpdateNewListInput = e => setNewListInput(e.target.value);

  return (
    <div className="board">
      {boardState.map(list => (
        <List key={list.id} list={list} setBoardState={setBoardState} />
      ))}
      <form onSubmit={addNewList}>
        <input type="text" value={newListInput} onChange={onUpdateNewListInput} />
        <button type="submit">Add list</button>
      </form>
    </div>
  );
}
