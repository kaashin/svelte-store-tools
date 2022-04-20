<script>
  import { SimpleStore, ObjectStore, ArrayStore , TextStore, NestedArrayStore, BooleanStore} from '$stores/store.js'
  import { StoreTools, register, clearRegisteredStores } from '$lib/StoreTools'
  import { onDestroy, onMount } from 'svelte'
  import { writable } from 'svelte/store';
  import Button from '$lib/StoreTools/Button.svelte'

  const badStore = 'this is a bad store';
  const emptyObject = writable({});
  const emptyArray = writable([]);

  // On mount, register the stores;
  register('Simple Value Store', SimpleStore);
  register('Text Store', TextStore);
  register('Boolean Store', BooleanStore);
  register('Array Store', ArrayStore);
  register('Nested Array Store', NestedArrayStore);
  register('Object Store', ObjectStore);
  register('Bad Store', badStore);
  register('Empty Object', emptyObject);
  register('Empty Array', emptyArray);

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
    padding: 2rem;
  }

  hr {
    margin: 2rem 0;
    border: dashed 1px rgb(60,60,60)
  }
</style>

<div class="container">
  <h1>Svelte Store Tools - Examples</h1>

  <h2>Simple Value Store</h2>
  Store value: {$SimpleStore}
  <Button on:click={decrement}>-</Button>
  <Button on:click={increment}>+</Button>
  <hr/>
  <h2>Array Store</h2>
  <ul>
    {#each $ArrayStore as item}
      <li>{item}</li>
    {/each}
  </ul>
  <hr/>
  <h2>Text Store</h2>
  <p>Text Store: {$TextStore}</p>
</div>

<div>
  <p>Boolean Store: {$BooleanStore}</p>
</div>
<div>
  <p>Array Store</p>
  
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
  
</div>

<StoreTools />