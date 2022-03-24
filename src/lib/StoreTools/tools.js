import { Stores } from './store.js';
import { get } from 'svelte/store';
import { uid } from 'uid';

// Take the store that is provided and subscribe to it.
export const register = (name, store) => {
  const currentStores = get(Stores);

  if (currentStores.length) {
    Stores.set([
      ...currentStores,
      {
        id: uid(32),
        name,
        store
      }
    ])
  } else {
    Stores.set([{
      id: uid(32),
      name,
      store
    }])
  }
}

export const clear = () => {
  Stores.set([])
}