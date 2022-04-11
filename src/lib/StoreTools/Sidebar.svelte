<script>
  import { fly } from 'svelte/transition';
  import { sidebarState } from './store.js';
  
  function handleClose() {
    console.log('this event was caught')
    $sidebarState.isOpen = false;
    $sidebarState.component = null;
    $sidebarState.ref = null;
  }
</script>

<style>
  .store-tools__sidebar {
    position: absulute;
    right: 0;
    min-width: 200px;
    border: solid 1px rgb(77, 77, 77);
    z-index: 10;
  }
</style>

{#if $sidebarState.isOpen}
  <div class="store-tools__sidebar" transition:fly={{x: 100, duration: 200}}>
    <svelte:component this={$sidebarState.component} props={$sidebarState.props} on:close={handleClose}/>
  </div>
{/if}