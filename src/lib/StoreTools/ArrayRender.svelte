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
    padding: 0.3rem;
  }

  input:hover {
    border: dotted 1px rgb(60,60,60)
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
  .object {
    padding-left: 1rem;
  }
  .line:hover {
    background-color: rgb(54, 54, 54);
  }
  .property-name {
    color: rgb(89, 188, 206);
  }

  [contenteditable] {
    background-color: rgb(39, 39, 39);
    padding: 0.3rem;
  }
  [contenteditable]:hover {
    background-color: rgb(25, 25, 25);
    padding-right: 2rem;
  }

  [contenteditable]:focus {
    outline: none;
  }

</style>

<div class="object">
  {#each arr as value, key}
    {#if typeof value === "object" && !value.length}
      <div class="line"><span class="property-name">{key}</span>: {"{"} </div>
      <ObjectRender bind:object={value} />
      <div class="line">{"}"}</div>
    {:else if typeof value === "object" && Array.isArray(value)}
      <div class="line"><span class="property-name">{key}</span>: Array({value.length})</div>
      <svelte:self bind:arr={value} />
    {:else if typeof value === "function"}
      <div class="line"><span class="property-name">{key}</span>: Function</div>
    {:else if typeof value === "boolean"}
      <div class="line">
        <select bind:value={value}>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
      </div>
    {:else if typeof value === "number"}
      <div class="line"><span class="property-name">{key}</span>: <input bind:value={value} type="number"/></div>
    {:else}
      <!-- <li>{property.key}: {property.value}</li> -->
      <div class="line"><span class="property-name">{key}</span>: <span contenteditable bind:innerHTML={value} /></div>
    {/if}
  {/each}
  </div>
