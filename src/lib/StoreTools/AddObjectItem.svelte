<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';

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
      case 'array':
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
    flex-direction: column;
    padding-bottom: 0.5em;
  }

  .input>label {
    margin-bottom: 0.3em;
    font-size: 0.9em;
    text-transform: uppercase;
  }

  .input>input {
    height: 1rem;
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
    Add Item to Object
  </h3>
  <div class="content">
    <div class="input">
      <label for="propertyName">Property name</label>  
      <input name="propertyName" type="text" bind:value={propertyName} />
    </div>
    <div class="input">
      <label for="itemType">Type</label> 
      <select name="itemType" bind:value={addItemType}>
        <option value="string">String</option>
        <option value="number">Number</option>
        <option value="boolean">Boolean</option>
        <option value="object">Object</option>
        <option value="array">Array</option>
      </select>
    </div>
    {#if addItemType === 'string'}
      <div class="input">
        <label for="value">Value </label>
        <input name="value" type="text" bind:value={newValue} />
      </div>  
    {:else if addItemType === 'number'}
      <div class="input">
        <label for="numberValue">Value </label>
        <input name="numberValue" type="number" bind:value={newValue} />
      </div>  
    {:else if addItemType === 'boolean'}
      <div class="input">
        <label for="booleanValue">Value </label>
        <select name="booleanValue" bind:value={newValue}>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
      </div> 
    {/if}
    <Button on:click={addItem}>Add</Button>
    <Button on:click={handleCancel}>Cancel</Button>
  </div>
</div>