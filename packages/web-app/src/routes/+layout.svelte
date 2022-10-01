<script>
  import "../app.postcss";

  import { onMount } from "svelte";
  import { Circle } from "svelte-loading-spinners";
  import { ConfigStore, ThemeStore } from "../stores";
  import { fade } from "svelte/transition";

  // Variables
  let isLoading = true;

  onMount(async () => {
    // WebApp is ready
    window.Telegram.WebApp.ready();

    // Initializing Theme
    await ThemeStore.initialize(window.Telegram.WebApp);

    // Validating WebAppInitData
    isLoading = false;
  });
</script>

{ #if isLoading }
  <!-- Loading screen -->
  <div transition:fade class="w-full h-screen flex items-center justify-center">
    <Circle color={$ThemeStore.button_color} size={50} />
  </div>
{ :else }
  <slot></slot>
{ /if }