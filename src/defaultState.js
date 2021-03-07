const DEFAULT_STATE = [
  {
    listName: 'TO-DO',
    id: 'to-do',
    cards: [
      { title: 'Groceries', id: 'groceries', description: 'bananas, lettuce' },
      { title: 'Laundry', id: 'laundry', description: 'white clothes' },
      { title: 'Sleep', id: 'sleep', description: '8 hours' },
    ],
  },
  {
    listName: 'PROGRESS',
    id: 'progress',
    cards: [
      { title: 'Cook', id: 'cook', description: 'tacos' },
      { title: 'Go for a walk', id: 'walk', description: '20 min' },
    ],
  },
  {
    listName: 'DONE',
    id: 'done',
    cards: [{ title: 'Finish trello assignment', id: 'assignment', description: '4 hours!' }],
  },
];

export default DEFAULT_STATE;
