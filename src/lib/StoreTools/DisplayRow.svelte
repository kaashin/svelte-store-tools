<script>
  export let value;
  export let key;

  export let tabIndex = 0;
</script>

<style>
  input {
    background-color: rgb(39, 39, 39);
    border: 0;
    color: rgb(79, 216, 226);
    font-family: 'Lucida Console', Consolas, monospace;
    font-size: 0.8rem;
    line-height: 0.8rem;
    margin-top: -0.2rem;
  }

  input:hover {
    border-bottom: dotted 1px rgb(79, 216, 226);
  }

  input:focus {
    border-bottom: dotted 1px rgb(79, 216, 226);
    outline: none;
  }

  [contenteditable] {
    background-color: rgb(39, 39, 39);
  }
  [contenteditable]:hover {
    border-bottom: dotted 1px rgb(79, 216, 226);
    padding-right: 2rem;
  }

  [contenteditable]:focus {
    outline: none;
    border-bottom: dotted 1px rgb(79, 216, 226);
  }

  .row {
    display: flex;
    /* border-bottom: solid 1px rgb(60,60,60); */
    padding-top: 0.3rem;
    padding-bottom: 0.2rem;
    font-size: 0.8rem;
    line-height: 1.4rem;
  }

  .key {
    padding-left: 1rem;
    padding-right: 1ex;
  }

  .value {
    color: rgb(79, 216, 226);
  }

</style>

<div 
  class="row"
>
  {#if $$props.key != null || $$props.key != undefined}
    <span class="key">
      {key}:
    </span>
  {/if}
  {#if $$props.value != null || $$props.value != undefined}
    <span class="value">
      {#if typeof value === "object" && !value.length}
        <ObjectRender bind:object={value}/>
      {:else if typeof value === "array" && !value.length}
        <ArrayRender bind:arr={value} />
      {:else if typeof value === "number"}
        <input bind:value={value} type="number" />
      {:else if typeof value === "boolean"}
        <input bind:value={value} type="checkbox" />
      {:else if typeof value === "string"}
        <!-- <input bind:value={value} type="text" /> -->
        <span contenteditable bind:innerHTML={value} />
      {:else}
        <span>{value}</span>
      {/if}
    </span>
  {/if}
  {#if $$slots.custom}
    <slot name="custom" />
  {/if}
</div>