<script>
  export let object = {}

  let displayArr = []

  for (const key in object) {
    displayArr.push({ key, value: object[key] })
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
      <svelte:self object={property.value} />
    {:else if typeof property.value === "object" && property.value.length}
      <li>{property.key}: Array({property.value.length})</li>
      <svelte:self object={property.value} />
    {:else if typeof property.value === "function"}
      <li>{property.key}: Function</li>
    {:else}
      <li>{property.key}: {property.value}</li>
    {/if}
  {/each}
</ul>