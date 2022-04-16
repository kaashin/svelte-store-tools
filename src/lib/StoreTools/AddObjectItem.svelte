<script>
  import { createEventDispatcher } from 'svelte';

  export let props;

  const dispatch = createEventDispatcher();
  
  let addItemType = "string";
  let object = props.object;
  let newValue;
  let propertyName;

  function addItem() {
    switch(addItemType) {
      case 'string':
        object = {...object, [propertyName]: newValue}
        break;
      case 'number':
        object = {...object, [propertyName]: newValue}
        break;
      case 'boolean':
        object = {...object, [propertyName]: newValue}
        break;
      case 'object':
        object = {...object, [propertyName]: {}}
        break;
      case 'objectay':
        object = {...object, [propertyName]: []}
        break;
    }

    props.updateState(object);
    props.onClose();
    dispatch('close');
  }

  function handleCancel() {
    props.onClose();
    dispatch('close');
  }

  console.log('object', object);
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
    margin: 1em;
    width: 300px;
  }
</style>

<div class="container">
  <div class="input">
    <label>Property name</label>  
    <input type="text" bind:value={propertyName} />
  </div>
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