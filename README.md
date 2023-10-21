# Roxy Store for React

Roxy Store is a lightweight state management library for React applications. It provides a simple and efficient way to manage your application's state.

## Installation

```bash
npm install roxy-store
```

## Usage

### Creating a Store

To create a new store, use the `createStore` function provided by Roxy Store.

```jsx
import { createStore } from 'roxy-store';

const initialState = /* initial state value */;
const myStore = createStore(initialState);
```

### Subscribing to Store Updates

You can subscribe to updates in the store using the `_subscribe` method.

```jsx
const myCallback = (newVal, oldVal) => {
  // Handle store update
};

myStore._subscribe(myCallback);
```

### Unsubscribing from Store Updates

To stop receiving updates, use the `_unsubscribe` method.

```jsx
myStore._unsubscribe(myCallback);
```

### Accessing Store State

The current state of the store can be accessed using the `store` property.

```jsx
const currentState = myStore.store;
```

### Hook for Store State in Components

To use the store state within a functional component, you can use the `useStoreState` hook.

```jsx
import { useStoreState } from 'roxy-store';

const MyComponent = () => {
  const [state, setState] = useStoreState(myStore);

  // `state` contains the current value of the store
  // `setState` is a function to update the store state
};
```

### Updating Store State

To update the store state, use the `setStore` function returned by `useStoreState`.

```jsx
const handleButtonClick = () => {
  const newValue = /* new value */;
  setState(newValue);
};
```

## Example

```jsx
import React from 'react';
import { createStore, useStoreState } from 'roxy-store';

const CounterComponent = () => {
  const counterStore = createStore(0);
  const [count, setCount] = useStoreState(counterStore);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <span>Count: {count}</span>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default CounterComponent;
```

In this example, a simple counter component is created using Roxy Store. The store is initialized with an initial value of `0`. The `useStoreState` hook is used to access and update the store state within the component.
