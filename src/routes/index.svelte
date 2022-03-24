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

<StoreTools height="50%" />