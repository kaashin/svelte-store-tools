<script>
  import { slide } from 'svelte/transition'
  import ArrayRender from './ArrayRender.svelte';
  import DisplayRow from './DisplayRow.svelte';
  import Chevron from './Chevron.svelte';

  export let object;
  export let open = false;
  export let tabIndex = 0;
  export let key;

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
  .object-block {
    display: flex;
    margin-top: -0.2em;
    padding-top: 0.2em;
    padding-left: 0.4em;
    padding-right: 0.4em;
    background-color: rgba(60,60,60,1);
    border-radius: 0.2em;

    transition: all 0.2s
  }

  .object-block:hover {
    background-color: rgb(89, 188, 206);
    cursor: pointer;
  }

  .chevron {
    display: inline-block;
    width: 1em;
    height: 1em;
    padding-top: 0.15em;
  }

  .object-content {
    padding-left: 1em;
  }

</style>

<DisplayRow key={key} tabIndex={tabIndex}>
  <div class="object-block" slot="custom" on:click={() => {open = !open}}>
    <span class="chevron">
      <Chevron direction={open ? "down" : "right"}/>
    </span>
    Object
  </div>
</DisplayRow>

{#if open}
  <div class="object-content" transition:slide|local={{duration: 200}}>
    {#each displayArr as property}
      {#if typeof property.value === "object" && !property?.value?.length}
        <svelte:self bind:object={property.value} key={property.key} tabIndex={tabIndex+1} slot="custom"/>
      {:else if typeof property.value === "object" && Array.isArray(property.value)}
        <ArrayRender bind:arr={property.value} key={property.key} slot="custom" tabIndex={tabIndex+1}/>
      {:else}
        <DisplayRow key={property.key} bind:value={property.value} tabIndex={tabIndex+1}/>
      {/if}
    {/each}
  </div>
{/if}
