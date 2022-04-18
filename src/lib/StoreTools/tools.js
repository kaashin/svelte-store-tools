import { Stores } from './store.js';
import { get } from 'svelte/store';
import { uid } from 'uid';

// Take the store that is provided and subscribe to it.
export const register = (name, store) => {
  // If the store is not a writable store, throw an error.
  let isValid = true;
  if (!store.subscribe) {
    isValid = false;
  }

  const currentStores = get(Stores);

  if (currentStores.length) {
    Stores.set([
      ...currentStores,
      {
        id: uid(32),
        name,
        isValid,
        store
      }
    ])
  } else {
    Stores.set([{
      id: uid(32),
      name,
      isValid,
      store
    }])
  }
}

export const clearRegisteredStores = () => {
  Stores.set([])
}

export const testFunction = () => {
  return 'hello';
}