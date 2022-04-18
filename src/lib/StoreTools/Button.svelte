<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = new createEventDispatcher();

</script>

<style>
  button {
    background-color: rgb(89, 188, 206);
    color: rgb(0,0,0);
    border: none;
    border-radius: 0.2em;
    padding: 0.4em 0.8em;
    transition: all 0.15s
  }
  
  button:hover {
    background-color: rgb(66, 140, 153);
    color: rgb(255,255,255);
  }
</style>

<button on:click={()=>dispatch('click')}>
  <slot></slot>
</button>