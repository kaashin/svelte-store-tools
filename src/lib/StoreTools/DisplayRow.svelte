<script>
  export let value;
  export let key;

  export let tabIndex = 0;

  const initType = typeof value;
  console.log({initType})

  $: if (initType && (value === null || value === undefined)) {
    console.log('value is null or undefined');
    if (initType === 'object') {
      value = {};
    } else if (initType === 'object' && Array.isArray(value)) {
      value = [];
    } else if (initType === 'string') {
      value = '';
    } else if (initType === 'number') {
      value = 0;
    } else if (initType === 'boolean') {
      value = false;
    } else {
      value = '';
    }
  }
</script>

<style>
  input {
    background-color: rgb(39, 39, 39);
    border: 0;
    color: rgb(79, 216, 226);
    font-family: 'Lucida Console', Consolas, monospace;
    line-height: 0.8em;
    margin-top: -0.2em;
    padding-left: 0.3em;
  }

  input:hover {
    border-bottom: dotted 1px rgb(79, 216, 226);
  }

  input:focus {
    outline: solid 1px rgb(79, 216, 226);
    border: none;
    padding: 0.3em;
  }

  select {
    background-color: rgb(39, 39, 39);
    border: 0;
    color: rgb(226,226,226);
    font-family: 'Lucida Console', Consolas, monospace;
    padding-left: 0.3em;
  }
  
  select:focus {
    outline: solid 1px rgb(79, 216, 226);
    border: none;
    padding: 0.3em;
  }

  [contenteditable] {
    background-color: rgb(39, 39, 39);
    padding-left: 0.3em;
  }
  [contenteditable]:hover {
    border-bottom: dotted 1px rgb(79, 216, 226);
    
  }

  [contenteditable]:focus {
    outline: solid 1px rgb(79, 216, 226);
    padding: 0.3em;
  }

  .row {
    display: flex;
    /* border-bottom: solid 1px rgb(60,60,60); */
    /* padding-left: 1em; */
    padding-top: 0.3em;
    padding-bottom: 0.3em;
    line-height: 1.4em;
  }

  .key {
    padding-right: 1ex;
  }

  .value {
    color: rgb(79, 216, 226);
  }

</style>

<div class="row">
  {#if $$props.key != null || $$props.key != undefined}
    <span class="key">
      {key}:
    </span>
  {/if}
  {#if $$props.value != null || $$props.value != undefined}
    <span class="value">
      {#if typeof value === "number"}
        <input bind:value={value} type="number" />
      {:else if typeof value === "boolean"}
        <select bind:value={value}>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
      {:else if typeof value === "string"}
        <!-- <input bind:value={value} type="text" /> -->
        <span contenteditable bind:innerHTML={value} />
      {:else if typeof value === "function"}
        <span>Function</span>
      {:else}
        <span>{value}</span>
      {/if}
    </span>
  {/if}
  {#if $$slots.custom}
    <slot name="custom" />
  {/if}
</div>