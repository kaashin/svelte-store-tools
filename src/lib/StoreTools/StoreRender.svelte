<script>
  import { get } from 'svelte/store';
  import ObjectRender from './ObjectRender.svelte';
  export let store;

  let storeType = getStoreType (store);
  
  function getStoreType (currentStore) {
    return typeof get(currentStore);
  }

  
</script>

<style>
  .render-store {
    font-family: 'Lucida Console', Consolas, monospace;
    font-size: 0.8rem;
    padding-left: 1rem;
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
    <div>
      <ObjectRender bind:object={$store}/>
    </div>
  {:else if storeType === "number"}
    <div class="basic-store">
      <p>Type: <span>{typeof $store}</span></p>
      <p>Value: <input bind:value={$store} type="number" /></p>
    </div>
  {:else if storeType === "boolean"}
    <div class="basic-store">
      <div>
        <p>Type: <span>{typeof $store}</span></p>
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
        <p>Type: <span>{typeof $store}</span></p>
        <p>Value: <input bind:value={$store} type="text" /></p>
      </div>
    </div>
  {/if}
</div>