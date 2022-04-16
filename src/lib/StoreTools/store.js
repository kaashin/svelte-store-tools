import { writable } from 'svelte/store';

export const Stores = writable([])
export const ContainerStore = writable({
  docked: 'bottom',
  isOpen: false
})
export const sidebarState = writable({
  isOpen: false,
  component: null,
  ref: null,
});
export const detailsHighlightRow = writable('');