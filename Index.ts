import { useEffect, useState } from "react"

type SubscribeCallback<T> = (newVal: T, oldVal: T) => any;

type StoreType<T> = {
  store: T,
  _subscribe: (callback: SubscribeCallback<T>) => void,
  _unsubscribe: (callback: SubscribeCallback<T>) => void
}

export const createStore = <T>(initValue: T): StoreType<T> => {
  let updateStack: SubscribeCallback<T>[] = [];
  const registerUpdate = (callback: SubscribeCallback<T>) => {
    updateStack.push(callback);
  };
  const unregisterUpdate = (callback: SubscribeCallback<T>) => {
    updateStack = updateStack.filter(a => callback !== a);
  };
  const handler = {
    set(target: any, prop: string, val: any) {
      const oldVal = target[prop];
      target[prop] = val;
      updateStack.forEach((f) => f(val, oldVal));
      return true;
    },
  };
  const proxy = new Proxy({ store: initValue, _subscribe: registerUpdate, _unsubscribe: unregisterUpdate }, handler);
  return proxy;
};

export const useStoreState = <T>(store: StoreType<T>) => {
  const [val, setVal] = useState(store.store);
  const update = (newVal: T, oldVal: T) => {
    setVal(newVal);
  }
  const setStore = (newVal: T) => {
    setVal(newVal);
    store.store = newVal;
  }
  useEffect(() => {
    store._subscribe(update);
    return () => {
      store._unsubscribe(update);
    }
  }, [store]);
  return [val, setStore] as const;
};
