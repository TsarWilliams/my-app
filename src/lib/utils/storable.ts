import { browser } from '$app/environment';
import { get, writable, type Writable } from 'svelte/store';

export function storable<T>(data: T) {
  const store = writable(data);
  const { subscribe, set, update } = store;

  browser &&
    localStorage.storable &&
    set(JSON.parse(localStorage.storable));

  return {
    subscribe,
    set(n) {
      browser && (localStorage.storable = JSON.stringify(n));
      set(n);
    },
    update(callback) {
      const updatedStore = callback(get(store));

      browser && (localStorage.storable = JSON.stringify(updatedStore));
      set(updatedStore);
    }
  } satisfies Writable<T>;
}
