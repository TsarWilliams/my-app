<script context="module" lang="ts">
  import { storable } from '$utils';

  // TODO: Make this more typesafe (make this const)
  const settingsData: Record<string, {
    name: string,
    description: string,
    default: boolean,
  }> = {
    dyslexicFont: {
      name: 'Dyslexic Font',
      description: 'Forces the use of a dyslexic font',
      default: true,
    },
  };

  const defaults = Object.fromEntries(Object.keys(settingsData).map((s) => [s, settingsData[s].default]));
  export const settings = storable<Record<keyof typeof settingsData, boolean>>(defaults, 'settings');
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
  } from '@rgossiaux/svelte-headlessui';
  export let isOpen = true;
</script>

<Dialog style="isolation: isolate" open={isOpen} on:close={() => (isOpen = false)}>
  <DialogOverlay
    style="position: fixed; inset: 0; z-index: -1; background-color: rgba(0, 0, 0, 0.6)"
  />

  <div class="contents">
    <DialogTitle><h1>Lorem Ipsum</h1></DialogTitle>
    <DialogDescription>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque optio
      aliquid ipsa facere odio quibusdam eaque dolor consectetur labore voluptas
      voluptates nesciunt minima, saepe at delectus! Voluptas consectetur ex dolores
      unde amet sunt modi, veniam nam quas voluptatum eaque voluptate!
    </DialogDescription>
    {#each Object.keys($settings) as name}
      {@const capitalizedName = name[0].toUpperCase() + name.slice(1)}
      {@const value = $settings[name]}
      <SwitchGroup>
        <div class="switch-container">
          <SwitchLabel class="switch-label">{capitalizedName}</SwitchLabel>
          <Switch
            bind:checked={$settings[name]}
            class={value ? 'switch switch-enabled' : 'switch switch-disabled'}
          >
            <span class="sr-only">{value ? 'Disable' : 'Enable'} {capitalizedName}</span>
            <span
              class="toggle"
              class:toggle-on={value}
              class:toggle-off={!value}
            />
          </Switch>
        </div>
      </SwitchGroup>
    {/each}
    <button on:click={() => (isOpen = false)}>Exit Settings</button>
  </div>
</Dialog>

<style>
  .contents {
    position: fixed;
    inset: 20%;
    padding: 2rem;
    text-align: center;
    background-color: white;
  }

  :global(.switch-container) {
    display: grid;
    grid-template-areas: "name switch"
                         "description switch";
    font-size: 1.25em;
  }

  :global(.switch-label) {
    grid-area: name;
    margin-right: 1rem;
  }

  :global(.switch) {
    --padding: calc(1rem / 3);

    grid-area: switch;
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
    background-color: rgb(44, 235, 37);
  }
  :global(.switch-disabled) {
    background-color: rgb(235, 50, 37);
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
</style>
