<script>
  import { SimpleStore, ObjectStore, ArrayStore } from '$stores/store.js'
  import { StoreTools, register, clear } from '$lib/StoreTools'
  import { onDestroy, onMount } from 'svelte'
import { writable } from 'svelte/store';

  const badStore = 'this is a bad store';
  const emptyObject = writable({});
  const emptyArray = writable([]);

  // On mount, register the stores;
  onMount(() => {
    register('Simple Store', SimpleStore);
    register('Array Store', ArrayStore);
    register('Object Store', ObjectStore);
    register('Bad Store', badStore);
    register('Bad Store', badStore);
    register('Bad Store', badStore);
    register('Bad Store', badStore);
    register('Bad Store', badStore);
    register('Empty Object', emptyObject);
    register('Empty Array', emptyArray);
  })

  onDestroy(() => {
    clear();
  });

  function increment () {
    $SimpleStore++;
  }
</script>

<style>

</style>

<div>
  SimpleStore Value = {$SimpleStore}
  <button on:click={increment}>Increment</button>
</div>
<div>
  <p>Object Store</p>
  <div>
    <label>Name</label>
    <input bind:value={$ObjectStore.name} type="text" />
  </div>
  <div>
    <label>Nested text</label>
    <input bind:value={$ObjectStore.testObj.test} type="text" />
  </div>
  <div>
    <label>Complex Array with Object</label>
    <input bind:value={$ObjectStore.complexArray[0].name} type="text" />
  </div>
  <div>
    <label>Array</label>
    <input bind:value={$ObjectStore.array[0]} type="text" />
    <input bind:value={$ObjectStore.array[1]} type="text" />
    <input bind:value={$ObjectStore.array[2]} type="text" />
  </div>
  <div>
    <label>Checking boolean</label>
    {#if $ObjectStore.boolean}
      <p>Show red if true</p>
    {:else}
      <p>Show green if false</p>
    {/if}
  </div>
</div>

<StoreTools height="50%" />