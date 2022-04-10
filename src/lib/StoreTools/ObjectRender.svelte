<script>
  import { slide } from 'svelte/transition'
  import ArrayRender from './ArrayRender.svelte';
  import DisplayRow from './DisplayRow.svelte';
  import Chevron from './Chevron.svelte';

  export let object;
  export let open = false;
  export let tabIndex = 0;

  let displayArr;

  function parseObject(obj) {
    const newArr = []
    for (const key in obj) {
      newArr.push({ key, value: obj[key]})
    }
    displayArr = [...newArr]  
  }

  function convertToObject(arr) {
    const newObj = {}
    for (const item of arr) {
      newObj[item.key] = item.value
    }
    return newObj
  }

  $: parseObject(object);
  // $: console.log(convertToObject(displayArr))
  $: if (displayArr?.length) { 
    object = convertToObject(displayArr)
  }
  
</script>

<style>
  input {
    background-color: rgb(39, 39, 39);
    border: 0;
    color: rgb(226,226,226);
    font-family: 'Lucida Console', Consolas, monospace;
    padding: 0.3rem;
  }

  input:hover {
    background-color: rgb(25,25,25);
  }

  input:focus {
    outline: none;
  }

  select {
    background-color: rgb(39, 39, 39);
    border: 0;
    color: rgb(226,226,226);
    font-family: 'Lucida Console', Consolas, monospace;
  }
  

  [contenteditable] {
    background-color: rgb(39, 39, 39);
    padding: 0.3rem;
  }
  [contenteditable]:hover {
    border: dotted 1px rgb(60,60,60);
    padding-right: 2rem;
  }

  [contenteditable]:focus {
    outline: none;
  }

  .line {
    height: 1.25rem;
    display: flex;
    align-items: center;
  }
  .line:hover {
    background-color: rgb(54, 54, 54);
  }
  .object {
    width: 100%;
  }

  .object > div {
    padding: 0.1rem 0rem;
    line-height: 1rem;
  }

  .property-name {
    color: rgb(89, 188, 206);
  }

  .object-block {
    display: flex;
    padding-top: 0.2rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    background-color: rgba(60,60,60,1);
    border-radius: 0.2rem;

    transition: all 0.2s
  }

  .object-block:hover {
    background-color: rgb(89, 188, 206);
    cursor: pointer;
  }

  .chevron {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    padding-top: 0.15rem;
  }

  .object-content {

  }

  .pl-1 {
    padding-left: 1rem;
  }

</style>

<div 
  class="object"
  class:pl-1={tabIndex===0}
>
  <DisplayRow>
    <div class="object-block" slot="custom" on:click={() => {open = !open}}>
      <span class="chevron">
        <Chevron direction={open ? "down" : "right"}/>
      </span>
      Object
    </div>
  </DisplayRow>
  {#if open}
    <div class="object-content" transition:slide={{duration: 200}}>
      {#each displayArr as property}
        {#if typeof property.value === "object" && !property?.value?.length}
          <DisplayRow key={property.key} tabIndex={tabIndex}>
            <svelte:self bind:object={property.value} tabIndex={tabIndex+1} slot="custom"/>
          </DisplayRow>
        {:else if typeof property.value === "object" && Array.isArray(property.value)}
          <DisplayRow key={property.key} tabIndex={tabIndex}>
            <ArrayRender bind:arr={property.value} slot="custom"/>
          </DisplayRow>
        {:else if typeof property.value === "function"}
          <div class="line"><span class="property-name">{property.key}</span>: Function</div>
        {:else if typeof property.value === "boolean"}
          <div class="line">
            <span class="property-name">{property.key}: </span>
            <select bind:value={property.value}>
              <option value={true}>true</option>
              <option value={false}>false</option>
            </select>
          </div>
        {:else}
          <DisplayRow key={property.key} bind:value={property.value} tabIndex={tabIndex}/>
        {/if}
      {/each}
    </div>
  {/if}
</div>
