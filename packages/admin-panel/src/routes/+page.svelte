<script lang="ts">
  // Importing components
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { User } from "../stores";
  
  onMount(() => {
    if ($User.isAuthorized) {
      goto('/home');
    } else {
      goto('/login');
    };
  });
</script>