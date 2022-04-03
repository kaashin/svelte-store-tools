<script>
  import { get } from 'svelte/store';
  import ObjectRender from './ObjectRender.svelte';
  import ArrayRender from './ArrayRender.svelte';
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

  .basic-store {
    padding-left: 1rem;
  }
</style>

<div class="render-store">
  {#if storeType === "object"}
    <div>
      <ObjectRender bind:object={$store}/>
    </div>
  {:else if storeType === "array"}
    <div>
      <ArrayRender bind:arr={$store} />
    </div>
  {:else if storeType === "number"}
    <div class="basic-store">
      <p>Type: <span>{storeType}</span></p>
      <p>Value: <input bind:value={$store} type="number" /></p>
    </div>
  {:else if storeType === "boolean"}
    <div class="basic-store">
      <div>
        <p>Type: <span>{storeType}</span></p>
        <p>Value: 
          <select bind:value={$store}>
            <option value={true}>true</option>
            <option value={false}>false</option>
          </select>
        </p>
      </div>
    </div>
  {:else}
    <div class="basic-store">
      <div>
        <p>Type: <span>{storeType}</span></p>
        <p>Value: <input bind:value={$store} type="text" /></p>
      </div>
    </div>
  {/if}
</div>

