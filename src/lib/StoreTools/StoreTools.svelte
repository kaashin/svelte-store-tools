<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { get } from 'svelte/store';
  import { Stores, ContainerStore } from './store.js'
  import StoreRender from './StoreRender.svelte';

  export let height = "200px" 

  let storeArr = [];

  onMount(() => {
    window.stores = [];
  })

  function toggleOpen() {
    $ContainerStore.isOpen = !$ContainerStore.isOpen;
  }
</script>

<style>
  .store-tools__container {
    position: fixed;
    bottom: 0;
    height: 200px;
    width: 100%;
    padding: 1rem;
    background-color: rgb(39, 39, 39);
    color: rgb(226, 226, 226);
    font-family: "Segoe UI", "San Francisco", "Open Sans", Tahoma, Geneva, sans-serif;
  }
  .store-tools__icon {
    position: fixed;
    z-index: 9999;
    bottom: 2rem;
    right: 2rem;
    width: 2rem;
    height: 2rem;
    background-color: rgb(10, 57, 85);
    color: rgb(226,226,226);
    padding: 0.5rem;
    border-radius: 0.4rem;
    transition: all 0.2s ease-in-out;
  }

  .store-tools__icon:hover {
    background-color: rgb(14, 86, 128);
  }
</style>
{#if $ContainerStore.isOpen}
  <div class="store-tools__container" style={`height: ${height}`} transition:fade={{duration: 150}}>
    {#each $Stores as store (store.id)}
      <p>{store.name}</p>
      <StoreRender store={store.store} />
    {/each}
  </div>
{/if}
  <div class="store-tools__icon" on:click={toggleOpen}>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd" />
    </svg>
  </div>