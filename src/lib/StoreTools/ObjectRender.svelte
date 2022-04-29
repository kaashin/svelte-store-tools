<script>
  import { slide, fade} from 'svelte/transition'
  import { sidebarState, detailsHighlightRow } from './store.js'
  import ArrayRender from './ArrayRender.svelte';
  import DisplayRow from './DisplayRow.svelte';
  import Chevron from './Chevron.svelte';
  import PlusCircle from './PlusCircle.svelte';
  import Icon from './Icon.svelte';
  import AddObjectItem from './AddObjectItem.svelte';

  
  export let object;
  export let open = false;
  export let tabIndex = 0;
  export let key;
  export let allowDelete = false; 
  export let parentDelete = () => {}
  export let handleDelete = (property) => {
    try {
      const newObj = {...object};
      delete newObj[property];
      object = {...newObj};
    } catch (error) {
      console.error(error)
    }
  }

  let addingItem = false;
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
  
  $: if (!open) {
    addingItem = false;
    $sidebarState.isOpen = false;
  }
</script>

<style>
  .object-block {
    display: flex;
    margin-top: -0.2em;
    padding-top: 0.2em;
    padding-left: 0.4em;
    padding-right: 0.4em;
    background-color: rgba(60,60,60,1);
    border-radius: 0.2em;

    transition: all 0.2s
  }

  .object-block:hover {
    background-color: rgb(89, 188, 206);
    cursor: pointer;
  }

  .chevron {
    display: inline-block;
    width: 1em;
    height: 1em;
    padding-top: 0.15em;
  }

  .object-content {
    padding-left: 1em;
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

<DisplayRow 
  key={key} 
  tabIndex={tabIndex} 
  allowHighlight={false}
  {allowDelete}
  handleDelete={()=>parentDelete(key)}
>
  <div class="object-block" slot="custom" on:click={() => {open = !open}}>
    <span class="chevron">
      <Chevron direction={open ? "down" : "right"}/>
    </span>
    Object
  </div>
</DisplayRow>

{#if open}
  <div class="object-content" transition:slide|local={{duration: 200}}>
    {#each displayArr as property}
      {#if typeof property.value === "object" && !property?.value?.length}
        <svelte:self 
          bind:object={property.value} 
          key={property.key} 
          tabIndex={tabIndex+1} 
          
          allowDelete={true}
          handleDelete={()=>{handleDelete(property.key)}}
        />
      {:else if typeof property.value === "object" && Array.isArray(property.value)}
        <ArrayRender 
          bind:arr={property.value}
          key={property.key} 
          
          tabIndex={tabIndex+1} 
          allowDelete={true} 
          parentDelete={()=>handleDelete(key)}
          />
      {:else}
        <DisplayRow key={property.key} bind:value={property.value} tabIndex={tabIndex+1} allowDelete={true} handleDelete={()=>handleDelete(property.key)}/>
      {/if}
    {/each}
  </div>
  <div class="add-item">
    <DisplayRow tabIndex={tabIndex+1}>
      <div slot="custom">
        {#if addingItem}
          Adding item {'>>>'}
        {:else}
          <div 
            class="add-item-block" 
            on:click={()=>{
              addingItem = true;
              $sidebarState.isOpen = true;
              $sidebarState.component = AddObjectItem;
              $sidebarState.props = {
                object,
                updateState: (newObj) => {
                  addingItem = false;
                  $sidebarState.isOpen = false;
                  $detailsHighlightRow = '';
                  object = {...newObj};
                },
                onClose: (test) => {
                  addingItem = false;
                  $detailsHighlightRow = '';
                  $sidebarState.isOpen = false;
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
