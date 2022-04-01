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
    padding-left: 1rem;
  }

  .object > div {
    padding: 0.1rem 0rem;
    line-height: 1rem;
  }

  .property-name {
    color: rgb(89, 188, 206);
  }
</style>

<div class="object">
  {#each displayArr as property}
    {#if typeof property.value === "object" && !property.value.length}
      <div class="line"><span class="property-name">{property.key}</span>: {"{"} </div>
        <div>
          <svelte:self bind:object={property.value} />
        </div>
      <div class="line">{"}"}</div>
    {:else if typeof property.value === "object" && Array.isArray(property.value)}
      <div class="line"><span class="property-name">{property.key}</span>: Array({property.value.length})</div>
      <ArrayRender bind:arr={property.value} />
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
    {:else if typeof property.value === "number"}
      <div class="line"><span class="property-name">{property.key}</span>: <input bind:value={property.value} type="number"/></div>
    {:else}
      <!-- <li>{property.key}: {property.value}</li> -->
      <div class="line"><span class="property-name">{property.key}</span>: <span contenteditable bind:innerHTML={property.value} /></div>
    {/if}
  {/each}
  </div>
