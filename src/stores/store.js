import { writable } from 'svelte/store';

export const SimpleStore = writable(0)
export const ObjectStore = writable({
  name: 'richard',
  testObj: {
    test: 'test'
  },
  array: [1, 2, 3],
  complexArray: [
    {
      name: 'test'
    }
  ]
})
