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
        arr = [...arr, newValue]
        break;
      case 'number':
        arr = [...arr, newValue]
        break;
      case 'boolean':
        arr = [...arr, newValue]
        break;
      case 'object':
        arr = [...arr, {}]
        break;
      case 'array':
        arr = [...arr, []]
        break;
    }

    props.updateState(arr);
    props.onClose();
    dispatch('close');
  }

  function handleCancel() {
    props.onClose();
    dispatch('close');
  }

  console.log('arr', arr);
</script>

<style>
  .input {
    display: flex;
    padding: 0.5em;
  }

  .input>label {
    margin-right: 1em;
  }
  
  .container {
    width: 300px;
  }

  .title {
    padding: 1em;
    line-height: 1em;
    font-size: 1em;
    margin: 0em;
  }

  .content {
    padding: 0.8em
  }
</style>

<div class="container">
  <h3 class="title">
    Add Item to Array
  </h3>
  <div class="content">
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
    <button on:click={handleCancel}>Cancel</button>
  </div>
</div>