<script>
  import ArrayRender from './ArrayRender.svelte';
  export let object;

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
  }

  select {
    background-color: rgb(39, 39, 39);
    border: 0;
    color: rgb(226,226,226);
    font-family: 'Lucida Console', Consolas, monospace;
  }
  .object {
    padding-left: 1rem;
  }
</style>

<div class="object">
  {#each displayArr as property}
    {#if typeof property.value === "object" && !property.value.length}
      <div>{property.key}: {"{"} </div>
      <svelte:self bind:object={property.value} />
      {"}"}
    {:else if typeof property.value === "object" && Array.isArray(property.value)}
      <div>{property.key}: Array({property.value.length})</div>
      <ArrayRender bind:arr={property.value} />
    {:else if typeof property.value === "function"}
      <div>{property.key}: Function</div>
    {:else if typeof property.value === "boolean"}
      <div>
        {property.key}: 
        <select bind:value={property.value}>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
      </div>
    {:else if typeof property.value === "number"}
      <div>{property.key}: <input bind:value={property.value} type="number"/></div>
    {:else}
      <!-- <li>{property.key}: {property.value}</li> -->
      <div>{property.key}: <span contenteditable bind:innerHTML={property.value} /></div>
    {/if}
  {/each}
  </div>
