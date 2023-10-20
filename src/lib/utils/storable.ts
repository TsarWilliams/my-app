import { browser } from '$app/environment';
import { get, writable, type Writable } from 'svelte/store';

export function storable<T>(data: T, id = Math.random().toString(36).slice(-5)) {
  const store = writable(data);
  const { subscribe, set, update } = store;

  browser &&
    localStorage[id] &&
    set(JSON.parse(localStorage[id]));

  return {
    subscribe,
    set(n) {
      browser && (localStorage[id] = JSON.stringify(n));
      set(n);
    },
    update(callback) {
      const updatedStore = callback(get(store));

      browser && (localStorage[id] = JSON.stringify(updatedStore));
      set(updatedStore);
    }
  } satisfies Writable<T>;
}
