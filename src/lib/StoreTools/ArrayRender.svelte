<script>
  import { slide } from 'svelte/transition'
  import ObjectRender from './ObjectRender.svelte';
  import DisplayRow from './DisplayRow.svelte';
  import Chevron from './Chevron.svelte';

  export let arr;  
  export let open = false;
  export let tabIndex = 0;
  export let key;

</script>

<style>
  .array-content {
    padding-left: 1em;
  }
  .array-block {
    display: flex;
    margin-top:-0.2em;
    padding-top: 0.2em;
    padding-left: 0.4em;
    padding-right: 0.4em;
    background-color: rgba(60,60,60,1);
    border-radius: 0.2em;

    transition: all 0.2s
  }

  .array-block:hover {
    background-color: rgb(89, 188, 206);
    cursor: pointer;
  }

  .chevron {
    display: inline-block;
    width: 1em;
    height: 1em;
    padding-top: 0.15em;
  }

</style>

<DisplayRow key={key} tabIndex={tabIndex}>
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
      <ObjectRender key={key} bind:object={value} slot="custom" tabIndex={tabIndex+1}/>
    {:else if typeof value === "object" && Array.isArray(value)}
      <svelte:self bind:arr={value} tabIndex={tabIndex+1} key={key} slot="custom"/>
    {:else}
      <DisplayRow key={key} bind:value={value} tabIndex={tabIndex+1}/>
    {/if}
  {/each}
</div>
{/if}
