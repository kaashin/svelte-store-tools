import { writable } from 'svelte/store';

export const Stores = writable([])
export const ContainerStore = writable({
  docked: 'bottom',
  isOpen: false
})