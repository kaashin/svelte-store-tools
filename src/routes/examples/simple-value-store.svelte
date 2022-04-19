<script>
  import { SimpleStore } from '$stores/store.js'
  import { StoreTools, register, clearRegisteredStores } from '$lib/StoreTools'
  import { onDestroy } from 'svelte'
  
  import Button from '$lib/StoreTools/Button.svelte'
  // On mount, register the stores;
  register('Simple Value Store', SimpleStore);

  onDestroy(() => {
    clearRegisteredStores();
  });

  function increment () {
    $SimpleStore++;
  }

  function decrement () {
    $SimpleStore--;
  }
</script>

<style>
  .container {
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem 2rem;
  }

  hr {
    margin: 2rem 0;
    border: dashed 1px rgb(60,60,60)
  }
</style>

<div class="container">
  Store value: {$SimpleStore}
  <Button on:click={decrement}>-</Button>
  <Button on:click={increment}>+</Button>
</div>

<StoreTools height={100} allowInProduction={true}/>