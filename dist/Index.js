import { useEffect, useState } from "react";
export const createStore = (initValue) => {
    let updateStack = [];
    const registerUpdate = (callback) => {
        updateStack.push(callback);
    };
    const unregisterUpdate = (callback) => {
        updateStack = updateStack.filter((a) => callback !== a);
    };
    const handler = {
        set(target, prop, val) {
            const oldVal = target[prop];
            target[prop] = val;
            updateStack.forEach((f) => f(val, oldVal));
            return true;
        },
    };
    const proxy = new Proxy({
        store: initValue,
        subscribe: registerUpdate,
        unsubscribe: unregisterUpdate,
    }, handler);
    return proxy;
};
export const useStoreState = (store) => {
    const [val, setVal] = useState(store.store);
    const update = (newVal, oldVal) => {
        setVal(newVal);
    };
    const setStore = (newVal) => {
        setVal(newVal);
        store.store = newVal;
    };
    useEffect(() => {
        store.subscribe(update);
        return () => {
            store.unsubscribe(update);
        };
    }, [store]);
    return [val, setStore];
};
//# sourceMappingURL=Index.js.map