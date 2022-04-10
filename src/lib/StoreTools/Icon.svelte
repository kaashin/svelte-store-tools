<script>
  export let size = "sm";
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

  .icon {
    transition: all 0.2s
  }
  .icon:hover {
    color: rgb(89, 188, 206);
  }
</style>

<div
  class="icon"
  class:sm={size === "sm"}
  class:md={size === "md"}
  class:lg={size === "lg"}
>
  <slot></slot>
</div>