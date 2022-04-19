<script>
  import { ArrayStore } from '$stores/store.js'
  import { StoreTools, register, clearRegisteredStores } from '$lib/StoreTools'
  import { onDestroy } from 'svelte'
  import { blur } from 'svelte/transition';
  
  import Button from '$lib/StoreTools/Button.svelte'
  // On mount, register the stores;
  register('Array Store', ArrayStore);

  onDestroy(() => {
    clearRegisteredStores();
  });

</script>

<style>
  .container {
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: row;
  }

  hr {
    margin: 2rem 0;
    border: dashed 1px rgb(60,60,60)
  }

  .block {
    min-width: 50px;
    height: 50px;
    background-color: rgb(89, 188, 206);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
  }
</style>

<div class="container">
  {#each $ArrayStore as item, key (key)}
    <div class="block" transition:blur={{duration: 400}}>{item}</div>
  {/each}
</div>

<StoreTools height={200} allowInProduction={true}/>