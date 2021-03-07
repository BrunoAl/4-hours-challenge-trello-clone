import React, { useState } from 'react';
import List from '../List';
import defaultState from '../../defaultState';

export default function Board(props) {
  const [boardState, setBoardState] = useState(defaultState);

  return (
    <div className="board">
      {boardState.map(list => (
        <List list={list} />
      ))}
    </div>
  );
}
