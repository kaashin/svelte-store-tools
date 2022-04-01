import { writable } from 'svelte/store';

export const SimpleStore = writable(0)
export const ArrayStore = writable([1,2,3])
export const ObjectStore = writable({
  name: 'richard',
  testObj: {
    test: 'test'
  },
  array: [1, 2, 3],
  complexArray: [
    {
      name: 'richard',
    },
    5,
    [5, 6, 7]
  ],
  boolean: false,
  testFunction: () => {
    console.log('test');
    console.log('show more');
  }
})
