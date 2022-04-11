<script>
  export let size = "sm";
  export let icon = null;
</script>

<style>
  .sm {
    width: 1em;
    height: 1em;
  }
  .md {
    width: 1.4em;
    height: 1.4em;
  }
  .lg {
    width: 2em;
    height: 2em;
  }

</style>

<div
  class="icon"
  class:sm={size === "sm"}
  class:md={size === "md"}
  class:lg={size === "lg"}
  style="{$$props.style ? $$props.style : ""}"
>
  {#if $$props.icon}
    <svelte:component this={icon} />
  {:else}
    <slot></slot>
  {/if}
</div>