<script>
  import { slide, fade } from 'svelte/transition'
  import { sidebarState, detailsHighlightRow } from './store.js'
  import ObjectRender from './ObjectRender.svelte';
  import DisplayRow from './DisplayRow.svelte';
  import Chevron from './Chevron.svelte';
  import PlusCircle from './PlusCircle.svelte';
  import Icon from './Icon.svelte';
  import AddArrayItem from './AddArrayItem.svelte';

  export let arr;  
  export let open = false;
  export let tabIndex = 0;
  export let key;
  export let allowDelete = false;
  export let parentDelete = () => {}
  export let handleDelete = (index) =>  {
    try {
      let newArr = [...arr];
      newArr.splice(index, 1)
      arr = [...newArr];
    } catch (error) {
      console.error(error)
    }
  }

  let addingItem = false;

  $: if (!open) {
    addingItem = false;
    $sidebarState.isOpen = false;
  }
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

  .add-item {
    padding-left: 1em;
  }
  .add-item-block {
    display: flex;
    transition: all 0.2s;
    cursor: pointer;
  }

  .add-item-block:hover {
    color:rgb(89, 188, 206)
  }
</style>

<DisplayRow key={key} tabIndex={tabIndex} allowHighlight={false} {allowDelete} handleDelete={()=>parentDelete(key)}>
  <div class="array-block" slot="custom" on:click={() => {open = !open}}>
    <span class="chevron">
      <Chevron direction={open ? "down" : "right"}/>
    </span>
    Array ({arr.length})
  </div>
</DisplayRow>

{#if open}
<div class="array-content" transition:slide|local={{duration: 200}}>
  {#each arr as value, key}
    {#if value != null || value != undefined}
      {#if typeof value === "object" && !Array.isArray(value)}
        <ObjectRender 
          key={key} 
          bind:object={value} 
          tabIndex={tabIndex+1} 
          allowDelete={true} 
          parentDelete={()=>handleDelete(key)}
        />
      {:else if typeof value === "object" && Array.isArray(value)}
        <svelte:self 
          bind:arr={value}
          tabIndex={tabIndex+1} 
          key={key}
          allowDelete={true} 
          parentDelete={()=>handleDelete(key)}
        />
      {:else}
        <DisplayRow key={key} bind:value={value} tabIndex={tabIndex+1} allowDelete={true} handleDelete={()=>handleDelete(key)}/>
      {/if}
    {:else}
      <DisplayRow key={key} bind:value={value} tabIndex={tabIndex+1} allowDelete={true} handleDelete={()=>handleDelete(key)}/>
    {/if}
  {/each}
</div>
<div class="add-item">
  <DisplayRow tabIndex={tabIndex+1}>
    <div slot="custom">
      {#if addingItem}
        {arr.length}: Adding item >>>
      {:else}
        <div 
          class="add-item-block" 
          on:click={()=>{
            addingItem = true;
            $sidebarState.isOpen = true;
            $sidebarState.component = AddArrayItem;
            $sidebarState.props = {
              arr,
              updateState: (newArr) => {
                addingItem = false;
                $sidebarState.isOpen = false;
                arr = [...newArr];
                $detailsHighlightRow = '';
              },
              onClose: (test) => {
                addingItem = false;
                $sidebarState.isOpen = false;
                $detailsHighlightRow = '';
              }
            };
          }} 
          in:fade={{duration: 200}}
          >
          <Icon size="md" icon={PlusCircle} style="padding-right: 0.4em"/> Add Item
        </div>
      {/if}
    </div>
  </DisplayRow>
</div>
{/if}