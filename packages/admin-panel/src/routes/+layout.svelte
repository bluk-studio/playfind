<script>
  import "../app.postcss";

  import { fade } from "svelte/transition";
  import { User, AppState } from "../stores";
  import { onMount } from "svelte";

  // Importing components
  import { 
    CircleSpinner, 
    Sidebar 
  } from "../components";
  
  onMount(async () => {
    // Trying to authorize our user
    // > Getting token from LocalStorage
    const token = localStorage.getItem("token") ?? "";

    // > Trying to authorize
    await User.authorize(token)
    
    AppState.setLoading(false);
  });
</script>

{ #if $AppState?.isLoading }
  <!-- Loading screen -->
  <div transition:fade class="absolute top-0 z-50 w-full h-screen flex items-center justify-center">
    <CircleSpinner color="#1e293b" size={25} />
  </div>
{ :else }
  <!-- Sidebar -->
  { #if $User.isAuthorized }
    <div class="w-full h-screen flex items-center overflow-hidden justify-center">
      <Sidebar />

      <!-- Content section -->
      <div class="w-10/12 h-full overflow-y-auto">
        <slot />
      </div>
    </div>
  { :else }
    <slot />
  { /if }
{ /if }

