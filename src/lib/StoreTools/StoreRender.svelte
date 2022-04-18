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
  
  $: storeType = getStoreType (store);
</script>

<style>
  .render-store {
    font-family: 'Lucida Console', Consolas, monospace;
    font-size: 12px;
  }
</style>

<div class="render-store">
  {#if storeType === "object"}
    <ObjectRender bind:object={$store}/>
  {:else if storeType === "array"}
    <ArrayRender bind:arr={$store} />    
  {:else}
    <DisplayRow key="Value" bind:value={$store}  allowHighlight={false}/>
  {/if}
</div>

