<script>
  import { SimpleStore } from '$stores/store.js'
  import { StoreTools, register } from '$lib/StoreTools'
  import { onMount } from 'svelte'


  // On mount, register the stores;
  onMount(() => {
    register('Simple Store', SimpleStore);
  })

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

<StoreTools />