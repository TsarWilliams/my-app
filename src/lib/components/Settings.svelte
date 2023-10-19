<script lang="ts">
    import {
        Dialog,
        DialogOverlay,
        DialogTitle,
        DialogDescription,
        SwitchGroup,
        SwitchLabel,
        Switch,
    } from "@rgossiaux/svelte-headlessui";
    import { preprocess } from "svelte/compiler";
    let isOpen = true;
    let completeButton: HTMLButtonElement;

    let enabled = true;
</script>

<Dialog
    style="isolation: isolate"
    open={isOpen}
    on:close={()=> (isOpen = false)}
>
    <DialogOverlay style="position: fixed; inset: 0; z-index: -1; background-color: rgba(0, 0, 0, 0.6)" />

    <div class="contents">
      <div class="text">
        <DialogTitle><h1>Lorem Ipsum</h1></DialogTitle>
      </div>
    <div style="text-align:center">
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit iure itaque delectus 
        animi nisi eligendi, tenetur deleniti voluptatibus a recusandae deserunt fuga officiis. 
        Doloribus ut perferendis sunt quae facere reprehenderit!</p>
    </div>
        <SwitchGroup>
            <div class="switch-container">
              <SwitchLabel class="switch-label">Dyslexic Font</SwitchLabel>
              <Switch
                bind:checked={enabled}
                class={enabled ? "switch switch-enabled" : "switch switch-disabled"}
              >
                <span class="sr-only">{enabled ? "Disable" : "Enable"} notifications</span>
                <span
                  class="toggle"
                  class:toggle-on={enabled}
                  class:toggle-off={!enabled}
                />
              </Switch>
            </div>
          </SwitchGroup>
      <div style="text-align:center">
          <h2>Press outside the box to close this window.</h2>
      </div>
    </div>
    <div class="py-16">
      <button id="bg-teal-900
      relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75">
        <span class="translate-x-9 pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200"></span>
      </button>
    </div>
</Dialog>

<style>
    .contents {
        position: fixed;
        inset: 20%;
        background-color: white;
        
    }
    
  .switch-container {
    display: flex;
    align-items: center;
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
    transition-property: color, background-color, border-color,
      text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
  }

  :global(.switch:focus) {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px rgb(99 102 241);
  }

  :global(.switch-enabled) {
    /* Blue */
    background-color: rgb(44, 235, 37);
  }

  :global(.switch-disabled) {
    /* Gray */
    background-color: rgb(235, 50, 37);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .toggle {
    display: inline-block;
    width: 1em;
    height: 1em;
    background-color: rgb(255 255 255);
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