import { removeItemById } from './';

describe('util functions', () => {
  it('should remove a item from a list by id and return a new list', () => {
    expect(
      removeItemById(
        [
          { title: 'Groceries', id: 'groceries', description: 'bananas, lettuce' },
          { title: 'Laundry', id: 'laundry', description: 'white clothes' },
          { title: 'Sleep', id: 'sleep', description: '8 hours' },
        ],

        'laundry',
      ),
    ).toEqual([
      { title: 'Groceries', id: 'groceries', description: 'bananas, lettuce' },
      { title: 'Sleep', id: 'sleep', description: '8 hours' },
    ]);
  });
});
