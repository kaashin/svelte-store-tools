<script>
  import ObjectRender from './ObjectRender.svelte';

  export let arr;  

  console.log({arr})
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
  {#each arr as value, key}
    {#if typeof value === "object" && !value.length}
      <div>{key}: {"{"} </div>
      <ObjectRender bind:object={value} />
      {"}"}
    {:else if typeof value === "object" && Array.isArray(value)}
      <div>{key}: Array({value.length})</div>
      <svelte:self bind:arr={value} />
    {:else if typeof value === "function"}
      <div>{key}: Function</div>
    {:else if typeof value === "boolean"}
      <div>
        <select bind:value={value}>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
      </div>
    {:else if typeof value === "number"}
      <div>{key}: <input bind:value={value} type="number"/></div>
    {:else}
      <!-- <li>{property.key}: {property.value}</li> -->
      <div>{key}: <span contenteditable bind:innerHTML={value} /></div>
    {/if}
  {/each}
  </div>
