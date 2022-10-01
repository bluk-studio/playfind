<script lang="ts">
  // Importing modules
  import { onMount } from "svelte";
  import { MainButtonStore, ThemeStore } from "../../../stores";
  import { Client } from "../../../client";
  import type { Server } from "../../../types";
  
  import { Circle } from "svelte-loading-spinners";

  // Variables
  const servers: Array<Server & { choosed: boolean }> = [];
  let isLoading = true;

  // Fetching all servers
  onMount(() => {
    // Expanding our app
    window.Telegram.WebApp.expand();

    // Updating main button
    MainButtonStore.setParams({
      text: "Продолжить",
      is_active: true,
      is_visible: true,
    });

    // Adding callback to this button
    MainButtonStore.onClick(() => {
      
    });

    // Fetching all servers
    Client.query('servers.getAllServers')
    .then((response) => {
      response.forEach((responseServer) => {
        // Adding additional properties
        const server = responseServer as Server & { choosed: boolean };
        server.choosed = false;

        // Pushing this to array
        servers.push(server);

        // Updating isLoading state
        setTimeout(() => isLoading = false, 500);
      });
    })
    .catch((error) => {
      console.log("error occured");
      console.log(error);
    });
  });
</script>

<div class="w-full h-screen py-6 px-2" style="background: { $ThemeStore.bg_color }">
  <!-- Title -->
  <div class="text-center px-2">
    <h1 class="text-3xl" style="color: { $ThemeStore.text_color };">Пожалуйста, выберите сервера</h1>
    <p class="text-sm" style="color: { $ThemeStore.hint_color };">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda numquam aperiam unde nostrum quos tenetur culpa iusto ad eligendi hic.</p>
  </div>

  <!-- Servers section -->
  { #if isLoading }
    <!-- Loading spinner -->
    <div class="w-full flex flex-col items-center justify-center" style="height: var(--tg-viewport-height);">
      <Circle size={30} color={ $ThemeStore.button_color } />
      
      <p class="text-sm mt-4" style="color: { $ThemeStore.hint_color }">Загрузка...</p>
    </div>
  { :else }
    <section class="w-full my-4 flex flex-wrap">
      { #each servers as server }
        <div on:click={() => server.choosed = !server.choosed} class="cursor-pointer w-full md:w-1/2 lg:w-1/3 rounded-md px-4 py-5 m-2 border-2 border-solid" style="background: { $ThemeStore.secondary_bg_color }; color: { $ThemeStore.text_color }; border-color: { server.choosed ? $ThemeStore.button_color : $ThemeStore.secondary_bg_color }">
          <!-- Server logotype & Name -->
          <div class="flex items-center">
            <div class="w-1/6 relative">
              <div class="w-full" style="padding-top: 100%">
                <img class="absolute inset-0 w-full h-full rounded-md" alt="server logotype" src="https://images.unsplash.com/photo-1615751072497-5f5169febe17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHw%3D&w=1000&q=80" />
              </div>
            </div>

            <!-- Basic server information -->
            <div class="ml-3">
              <h1 class="text-2xl">{ server.name }</h1>

              { #if server.website }
                <p class="text-xs" style="color: { $ThemeStore.hint_color }">{ server.website }</p>
              { /if }
            </div>
          </div>

          <!-- Advanced Server information -->
          <div class="mt-3">
            <!-- Tags-like info -->
            <div class="mt-0.5 flex items-center flex-wrap" style="color: { $ThemeStore.hint_color };">
              { #if server.tags.length > 0 }
                <p class="text-xs">{ server.tags[0] }</p>
                
                { #if server.tags.length > 1 }
                  { #each server.tags.filter((tag) => tag != server.tags[0]) as info }
                    <!-- Divider -->
                    <span class="mx-1.5">•</span>
                    <p class="text-xs">{ info }</p>
                  { /each }
                { /if }
              { /if }
            </div>
            
            <!-- Owner server info -->
            <p class="mt-2 text-sm" style="color: { $ThemeStore.hint_color }">{ server.description }</p>
          </div>
        </div>
      { /each }
    </section>

    <!-- "Wanna see your server here?" section -->
    <section class="px-2 pb-6">
      <div class="w-full flex flex-col items-start rounded-md px-4 py-5" style="background: { $ThemeStore.secondary_bg_color }; color: { $ThemeStore.text_color }">
        <h1 class="text-2xl">Хотите увидеть тут свой сервер?</h1>
        <p class="text-xs" style="color: { $ThemeStore.hint_color };">Lorem ipsum dolor sit amet consectetur adipisicing elit. A ducimus aliquid ea, cumque rem debitis blanditiis enim repudiandae provident quis?</p>

        <!-- Button -->
        <button class="mt-4 rounded-md px-4 py-2" style="background: { $ThemeStore.button_color }; color: { $ThemeStore.button_text_color };">
          <p class="text-sm">Связаться с нами</p>
        </button>
      </div>
    </section>
  { /if }
</div>