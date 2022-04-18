# Svelte Store Tools

A simple dev tool to help you debug your Svelte stores.

[Repository](https://github.com/kaashin/svelte-store-tools)

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

Simple Value Store
![Simple value store](/examples/01-simple-value-store.gif "Simple Value Store")




