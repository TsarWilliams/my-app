<script context="module" lang="ts">
  import { get } from 'svelte/store';
  import { storable } from '$utils';

  const defaults = {
    dyslexicFont: true,
  } as const;
  type Setting = keyof typeof defaults;

  const settingsData = {
    dyslexicFont: {
      name: 'Dyslexic Font',
      description: 'Forces the use of a dyslexic font'
    },
  } as const satisfies Record<Setting, {
    name: string,
    description: string,
  }>;

  export const settings = storable<Record<Setting, boolean>>(defaults, 'settings');

  const settingsKeys = () => Object.keys(get(settings)) as Setting[]; // 😭
</script>

<script lang="ts">
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
    SwitchGroup,
    SwitchLabel,
    Switch,
    SwitchDescription,
  } from '@rgossiaux/svelte-headlessui';
  export let isOpen = true;
</script>

<Dialog style="isolation: isolate" open={isOpen} on:close={() => (isOpen = false)}>
  <DialogOverlay style="position: fixed; inset: 0; z-index: -1; background-color: hsl(0 0% 0% / 0.6)" />

  <div class="contents">
    <DialogTitle class="settings-title">Settings</DialogTitle>
    {#each settingsKeys() as name}
      {@const value = $settings[name]}
      {@const data = settingsData[name]}
      <SwitchGroup class="switch-container">
        <SwitchLabel class="switch-label">{data.name}</SwitchLabel>
        <SwitchDescription class="switch-description">{data.description}</SwitchDescription>
        <Switch
          bind:checked={$settings[name]}
          class={value ? 'switch switch-enabled' : 'switch switch-disabled'}
        >
          <span class="sr-only">{value ? 'Disable' : 'Enable'} {data.name}</span>
          <span
            class="toggle"
            class:toggle-on={value}
            class:toggle-off={!value}
          />
        </Switch>
      </SwitchGroup>
    {/each}
    <footer>
      <button
        class="close"
        on:click={() => (isOpen = false)
      }>Close Settings</button>
    </footer>
  </div>
</Dialog>

<style>
  .contents {
    position: fixed;
    inset: 20%;
    padding: 2rem;
    background-color: white;
  }

  :global(.settings-title) {
    text-align: center;
    font-size: 2em;
    margin-block-end: 1rem;
  }

  :global(.switch-container) {
    display: grid;
    grid-template-areas: "name switch"
                         "description switch";
  }

  :global(.switch-label) {
    grid-area: name;
  }

  :global(.switch) {
    --padding: calc(1rem / 3);

    grid-area: switch;
    place-self: center end;
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: var(--padding);
    height: 1.5em;
    width: 2.75em;
    border: none;
    border-radius: 1.5em;
    transition-property: background-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
  }
  :global(.switch:focus) {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  :global(.switch-enabled) {
    background-color: hsl(118, 83%, 53%);
  }
  :global(.switch-disabled) {
    background-color: hsl(4, 83%, 53%);
  }
  .toggle {
    display: inline-block;
    position: absolute;
    inset: var(--padding);
    height: calc(100% - var(--padding) * 2);
    aspect-ratio: 1;
    border-radius: 1em;
    transition-property: all;
    transition-timing-function: inherit;
    transition-duration: inherit;
    background-color: white;
  }
  .toggle-on {
    left: 100%;
    translate: calc(-100% - var(--padding));
  }

  :global(.switch-description) {
    font-size: 0.8em;
  }

  /* TODO: Make this less hacky (ie don't use position absolute) */
  footer {
    display: grid;
    justify-content: end;
    position: absolute;
    inset: auto 0 0 0;
    padding: 1rem;
    background-color: hsl(0 0% 0% / 0.1);
  }

  .close {
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: hsl(4, 83%, 53%);
  }
</style>
