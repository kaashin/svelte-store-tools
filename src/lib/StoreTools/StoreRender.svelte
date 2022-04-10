<script>
  import { get } from 'svelte/store';
  import ObjectRender from './ObjectRender.svelte';
  import ArrayRender from './ArrayRender.svelte';
  import DisplayRow from './DisplayRow.svelte';
  export let store;
 
  function getStoreType (currentStore) {
    const type = typeof get(currentStore);
    // Check if it happens to be an array
    if (type === 'object' && Array.isArray(get(currentStore))) {
      return 'array';
    } else {
      return type;
    }
  }
  
  $: console.log({$store})
  $: storeType = getStoreType (store);
</script>

<style>
  .render-store {
    font-family: 'Lucida Console', Consolas, monospace;
    font-size: 0.8rem;
  }
  input {
    background-color: rgb(39, 39, 39);
    border: 0;
    color: rgb(226,226,226);
    font-family: 'Lucida Console', Consolas, monospace;
  }

  input:hover {
    background-color: rgb(25,25,25)
  }

  .render-store p {
    margin: 0;
  }
</style>

<div class="render-store">
  {#if storeType === "object"}
    <ObjectRender bind:object={$store}/>
  {:else if storeType === "array"}
    <ArrayRender bind:arr={$store} />    
  {:else}
    <DisplayRow key="Value" bind:value={$store}/>
  {/if}
</div>

