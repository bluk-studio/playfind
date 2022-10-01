<script lang="ts">
  // Importing modules
  import { SidebarLinks } from "./links";
  import Logotype from "../../../assets/logotype.svg";
  import { page } from "$app/stores";
  import type { ISidebarLink } from "./links/link.type";

  // Variables
  let links = SidebarLinks;

  page.subscribe(() => {
    // Triggering {each} update
    links = SidebarLinks;
  });

  // Function, that'll check if user is currently
  // browsing this page or no
  function defaultChecker(link: ISidebarLink): boolean {
    return $page.url.pathname.startsWith(link.href);
  };
</script>

<!-- Sidebar layout -->
<sidebar class="w-2/12 pt-10 px-4 flex flex-col h-screen bg-slate-50">
  <!-- Logotype -->
  <div class="w-full flex justify-center">
    <img class="h-8" src={Logotype} alt="">
  </div>

  <!-- Buttons -->
  <div class="flex-grow flex flex-col mt-6">
    { #each links as link }
      { @const isCurrentlyViewed = link.checker == null ? defaultChecker(link) : link.checker(link) }

      <a href={link.href} class="my-2 flex items-center w-full px-2 py-2 group hover:bg-slate-200 text-slate-900 border-b-2 { isCurrentlyViewed ? "border-blue-400 rounded-t-md bg-slate-100" : "rounded-md border-slate-50" }">
        <!-- Icon -->
        <svelte:component this={link.icon} />

        <!-- Text -->
        <p class="ml-2 text-sm">{link.text}</p>
      </a>
    { /each }
  </div>

  <div class="opacity-60 text-center pb-4">
    <!-- App Info -->
    <p class="text-xs text-black">AppVersion: 1.0.0</p>
  </div>
</sidebar>