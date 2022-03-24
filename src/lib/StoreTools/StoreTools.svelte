<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { Stores } from './store.js'
  import StoreRender from './StoreRender.svelte';

  export let height = "200px" 

  let storeArr = [];

  onMount(() => {
    window.stores = [];
  })

  $: console.log($Stores);
</script>

<style>
  .store-tools__container {
    position: fixed;
    bottom: 0;
    height: 200px;
    width: 100%;
    border: solid 1px red;
  }
</style>

<div class="store-tools__container" style={`height: ${height}`}>
  Store Tools!

  {#each $Stores as store (store.id)}
    <p>{store.name}</p>
    <StoreRender store={store.store} />
  {/each}
</div>