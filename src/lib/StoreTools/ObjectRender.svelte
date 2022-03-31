<script>
  export let object;

  let displayArr;

  function parseObject(obj) {
    const newArr = []
    for (const key in obj) {
      newArr.push({ key, value: obj[key] })
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
  ul {
    list-style-type: none;
    padding-left: 1rem;
  }
  ul li {
    padding-left: 1rem;
  }
</style>

<ul>
  {#each displayArr as property}
    {#if typeof property.value === "object" && !property.value.length}
      <li>{property.key}: Object </li>
      <svelte:self bind:object={property.value} />
    {:else if typeof property.value === "object" && property.value.length}
      <li>{property.key}: Array({property.value.length})</li>
      <svelte:self bind:object={property.value} />
    {:else if typeof property.value === "function"}
      <li>{property.key}: Function</li>
    {:else if typeof property.value === "boolean"}
      {property.key}: 
      <select bind:value={property.value}>
        <option value={true}>true</option>
        <option value={false}>false</option>
      </select>
    {:else}
      <!-- <li>{property.key}: {property.value}</li> -->
      <li>{property.key}: <input bind:value={property.value} /></li>
    {/if}
  {/each}
</ul>