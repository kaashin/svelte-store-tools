import { writable } from 'svelte/store';

export const SimpleStore = writable(0)
export const TextStore = writable('A string of text')
export const ArrayStore = writable([1,2,3])
export const NestedArrayStore = writable([1,2,3,[4,5,6],[]])
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
export const BooleanStore = writable(false);