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
  let isOpen = true;
  let completeButton: HTMLButtonElement;

  let enabled = true;
</script>

<Dialog style="isolation: isolate" open={isOpen} on:close={() => (isOpen = false)}>
  <DialogOverlay style="position: fixed; inset: 0; z-index: -1; background-color: rgba(0, 0, 0, 0.6)" />

  <div class="contents">
    <DialogTitle><h1>Lorem Ipsum</h1></DialogTitle>
    <DialogDescription>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque optio aliquid ipsa facere odio quibusdam eaque dolor consectetur labore voluptas voluptates nesciunt minima, saepe at delectus! Voluptas consectetur ex dolores unde amet sunt modi, veniam nam quas voluptatum eaque voluptate!
    </DialogDescription>
    <SwitchGroup>
      <div class="switch-container">
        <SwitchLabel class="switch-label">Dyslexic Font</SwitchLabel>
        <Switch
          bind:checked={enabled}
          class={enabled ? 'switch switch-enabled' : 'switch switch-disabled'}
        >
          <span class="sr-only">{enabled ? 'Disable' : 'Enable'} notifications</span>
          <span
            class="toggle"
            class:toggle-on={enabled}
            class:toggle-off={!enabled}
          />
        </Switch>
      </div>
    </SwitchGroup>
    <div>
      <h2>Press outside the box to close this window.</h2>
    </div>
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

  .switch-container {
    font-size: 1.25em;
  }

  :global(.switch-label) {
    margin-right: 1rem;
  }

  :global(.switch) {
    position: relative;
    display: inline-flex;
    align-items: center;
    border-radius: 9999px;
    height: 1.5em;
    width: 2.75em;
    transition-property: color, background-color, border-color, text-decoration-color,
      fill, stroke;
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
    width: 1em;
    height: 1em;
    background-color: white;
    border-radius: 9999px;
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
  }

  .toggle-on {
    transform: translateX(1.25em);
  }

  .toggle-off {
    transform: translateX(0em);
  }
</style>
