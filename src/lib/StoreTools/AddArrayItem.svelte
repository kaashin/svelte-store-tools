<script>
  import { createEventDispatcher } from 'svelte';
  export let props;

  const dispatch = createEventDispatcher();
  
  let addItemType = "string";
  let arr = props.arr;
  let newValue;

  function addItem() {
    switch(addItemType) {
      case 'string':
        arr = [...arr, '']
        break;
      case 'number':
        arr = [...arr, 0]
        break;
      case 'boolean':
        arr = [...arr, false]
        break;
      case 'object':
        arr = [...arr, {}]
        break;
      case 'array':
        arr = [...arr, []]
        break;
    }

    props.updateState(arr);

    dispatch('close');
  }

  console.log('arr', arr);
</script>

<style>
  .input {
    display: flex;
    
  }
</style>

<div>
  <div class="input">
    <label>Type</label> 
    <select bind:value={addItemType}>
      <option value="string">String</option>
      <option value="number">Number</option>
      <option value="boolean">Boolean</option>
      <option value="object">Object</option>
      <option value="array">Array</option>
    </select>
  </div>
  {#if addItemType === 'string'}
    <div class="input">
      <label>Value </label>
      <input type="text" bind:value={newValue} />
    </div>  
  {:else if addItemType === 'number'}
    <div class="input">
      <label>Value </label>
      <input type="number" bind:value={newValue} />
    </div>  
  {:else if addItemType === 'boolean'}
    <div class="input">
      <label>Value </label>
      <select bind:value={newValue}>
        <option value={true}>true</option>
        <option value={false}>false</option>
      </select>
    </div> 
  {/if}
  <button on:click={addItem}>Add</button>
</div>