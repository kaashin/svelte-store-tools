<script>
  import { SimpleStore, ObjectStore } from '$stores/store.js'
  import { StoreTools, register, clear } from '$lib/StoreTools'
  import { onDestroy, onMount } from 'svelte'


  // On mount, register the stores;
  onMount(() => {
    register('Simple Store', SimpleStore);
    register('Object Store', ObjectStore);
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