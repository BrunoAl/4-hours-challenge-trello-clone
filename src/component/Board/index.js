import React, { useState, useEffect } from 'react';
import List from '../List';
import defaultState from '../../defaultState';
import { addNewListToState } from './utils';

export default function Board() {
  const [boardState, setBoardState] = useState(
    // Lazy initializer
    () => JSON.parse(window.localStorage.getItem('bruno-trello-clone-app')) || defaultState,
  );
  const [newListInput, setNewListInput] = useState('');

  const onUpdateNewListInput = e => setNewListInput(e.target.value);

  // Persists board state
  useEffect(() => window.localStorage.setItem('bruno-trello-clone-app', JSON.stringify(boardState)), [boardState]);

  function addNewList(e) {
    e.preventDefault();
    setBoardState(state => addNewListToState(state, newListInput));
  }

  return (
    <div className="board">
      {boardState.map(list => (
        <List key={list.id} list={list} setBoardState={setBoardState} />
      ))}
      <form onSubmit={addNewList}>
        <input type="text" aria-label="add new card" value={newListInput} onChange={onUpdateNewListInput} />
        <button type="submit">Add list</button>
      </form>
    </div>
  );
}
