<script>
  import { get } from 'svelte/store';
  import ObjectRender from './ObjectRender.svelte';
  export let store;

  let storeType = getStoreType (store);
  console.log({storeType})
  
  function getStoreType (currentStore) {
    return typeof get(currentStore);
  }

  
</script>

{#if storeType === "object"}
  <div>
    Show object
    <ObjectRender bind:object={$store}/>
  </div>
{:else}
  <div>
    <input bind:value={$store} type="text" />
  </div>
{/if}