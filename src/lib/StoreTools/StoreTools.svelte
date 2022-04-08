<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { get } from 'svelte/store';
  import { Stores, ContainerStore } from './store.js'
  import StoreRender from './StoreRender.svelte';

  export let height = "200px" 

  let selectedStoreIndex;

  function toggleOpen() {
    $ContainerStore.isOpen = !$ContainerStore.isOpen;
  }

  function setActiveStore(storeId) {
    selectedStoreIndex = $Stores.findIndex(store => store.id === storeId);
  } 

</script>

<style>
  .store-tools__container {
    position: fixed;
    bottom: 0;
    min-height: 200px;
    width: 100%;
    background-color: rgb(39, 39, 39);
    color: rgb(226, 226, 226);
    font-family: "Segoe UI", "San Francisco", "Open Sans", Tahoma, Geneva, sans-serif;
    overflow-y: auto;
    display: flex;
  }
  .store-tools__tab {
    position: fixed;
    z-index: 9999;
    display: flex;

    align-items: center;
    bottom: 0;
    right: 2rem;
    height: 1rem;
    background-color: rgb(10, 57, 85);
    color: rgb(226,226,226);
    padding: 0.5rem;
    border-radius: 0.4rem 0.4rem 0 0;
    transition: all 0.2s ease-in-out;

    cursor: pointer;
  }

  .store-tools__tab:hover {
    background-color: rgb(14, 86, 128);
  }

  .store-tools__icon {
    height: 1rem;
    width: 1rem;
    margin-right: 0.4rem;
  }

  .store-list {
    min-width: 200px;
    border: solid 1px rgb(60,60,60);
  }
  .store-list__item {
    padding: 0.4rem;
    cursor: pointer;
    
    border-bottom: solid 1px rgb(60,60,60);
  }

  .store-list__item.active { 
    background-color: rgb(60, 60, 60)
  }

  .store-details {
    padding: 0.5rem;
    width: 100%;
  }
</style>
{#if $ContainerStore.isOpen}
  <div class="store-tools__container" style={`height: ${height}`} transition:fade={{duration: 150}}>
    <div class="store-list">
      {#each $Stores as store, index (store.id)}
        <div 
          class="store-list__item" on:click={()=>setActiveStore(store.id)}
          class:active={index === selectedStoreIndex}
        >
          {store.name}
        </div>  
      {/each}
    </div>
    <div class="store-details">
      {#if selectedStoreIndex >= 0}
       {#if $Stores[selectedStoreIndex]?.isValid}
          <StoreRender store={$Stores[selectedStoreIndex]?.store} />
        {:else}
          <p>Error: This doesn't appear to be a valid svelte store</p>
        {/if}
      {:else}
        <p>Select a store</p>
      {/if}
    </div>
  </div>
{/if}
  <div class="store-tools__tab" on:click={toggleOpen}>
    <div class="store-tools__icon">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd" />
      </svg>
    </div>
    <span>Store Tools</span>
  </div>