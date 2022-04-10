<script>
  import { slide } from 'svelte/transition'
  import ObjectRender from './ObjectRender.svelte';
  import DisplayRow from './DisplayRow.svelte';
  import Chevron from './Chevron.svelte';

  export let arr;  
  export let open = false;
  export let tabIndex = 0;

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
  .array {
    /* padding-left: 1rem; */
  }

  .pl-1 {
    padding-left: 1rem;
  }

  .array-content {

  }
  .line:hover {
    background-color: rgb(54, 54, 54);
  }
  .property-name {
    color: rgb(89, 188, 206);
  }

  .array-block {
    display: flex;
    padding-top: 0.2rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    background-color: rgba(60,60,60,1);
    border-radius: 0.2rem;

    transition: all 0.2s
  }

  .array-block:hover {
    background-color: rgb(89, 188, 206);
    cursor: pointer;
  }

  .chevron {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    padding-top: 0.15rem;
  }

</style>

<div 
  class="array"
  class:pl-1={tabIndex===0}
>
  <DisplayRow>
    <div class="array-block" slot="custom" on:click={() => {open = !open}}>
      <span class="chevron">
        <Chevron direction={open ? "down" : "right"}/>
      </span>
      Array ({arr.length})
    </div>
  </DisplayRow>
  {#if open}
  <div class="array-content" transition:slide={{duration: 200}}>
    {#each arr as value, key}
      {#if typeof value === "object" && !value.length}
        <DisplayRow key={key} tabIndex={tabIndex}>
          <ObjectRender bind:object={value} slot="custom"/>
        </DisplayRow>
        <!-- <div class="line"><span class="property-name">{key}</span>: {"{"} </div>
        <ObjectRender bind:object={value} />
        <div class="line">{"}"}</div> -->
      {:else if typeof value === "object" && Array.isArray(value)}
        <DisplayRow key={key} tabIndex={tabIndex}>
          <svelte:self bind:arr={value} tabIndex={tabIndex+1} slot="custom"/>
        </DisplayRow>
      {:else if typeof value === "function"}
        <div class="line"><span class="property-name">{key}</span>: Function</div>
      {:else if typeof value === "boolean"}
        <div class="line">
          <select bind:value={value}>
            <option value={true}>true</option>
            <option value={false}>false</option>
          </select>
        </div>    
      {:else}
        <DisplayRow key={key} bind:value={value} tabIndex={tabIndex}/>
      {/if}
    {/each}
  </div>
  {/if}
</div>
