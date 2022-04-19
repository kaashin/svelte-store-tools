<script>
  import Examples from './../components/Examples.svelte';
</script>

<style>
  iframe {
    border: solid 1px rgb(45,45,45);
  }
</style>

# Svelte Store Tools

A simple dev tool to help you debug your Svelte stores.

[Repository](https://github.com/kaashin/svelte-store-tools)

## Details

This dev tool is intended to help with inspecting and debugging Svelte stores by showing the data that is contained in the store as they are modified. You can also modify the data in the stores and see your app update with the new data. 

## Install

Install the `svelte-store-tools` package.
```
npm install svelte-store-tools
```

## Use It

In your svelte-kit route, import the `StoreTools` component and `register` from `svelte-store-tools`
```
import { StoreTools } from 'svelte-store-tools';
```

Add the component

```
<StoreTools />
```

Register the stores that you want to be able to debug when in development. First parameter is the name of the store that will be displayed in the dev tool, followed by a reference to the Svelte store.

```
register('Simple Store', SimpleStore);
```

If you need to clear the stores that have been registered, there is a `clearRegisteredStores` function that can be imported and excuted. For example, in an `onDestroy()` function.

## Examples

### Simple Value Store
<iframe src="/examples/simple-value-store" height=300/>

### Array Store
<iframe src="/examples/array-store" height=300 />





