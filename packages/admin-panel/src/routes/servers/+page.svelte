<script lang="ts">
  // Importing modules
  import { onMount } from "svelte";
  import { Client } from "../../client";
  import type { Server } from "../../types";
  
  import { CircleSpinner } from "../../components";

  import RiAddLine from '~icons/ri/add-line';
  import RiArrowDropUpLine from '~icons/ri/arrow-drop-up-line';
  import RiSettings3Line from '~icons/ri/settings-3-line';

  // Variables
  const servers: Array<Server & { isPanelOpened: boolean }> = [];
  let isLoading = true;

  // Fetching all servers
  onMount(() => {
    // Fetching all servers
    Client.query('servers.getAllServers')
    .then((response) => {
      response.forEach((responseServer) => {
        // Adding additional properties
        const server = responseServer as Server & { isPanelOpened: boolean };
        server.isPanelOpened = false;

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

<div class="w-full h-screen p-6">
  <!-- Servers section -->
  { #if isLoading }
    <!-- Loading spinner -->
    <div class="w-full flex flex-col items-center justify-center" style="height: var(--tg-viewport-height);">
      <CircleSpinner size={30} color="#000" />
      
      <p class="text-sm mt-4">Загрузка...</p>
    </div>
  { :else }
    <!-- Header -->
    <div class="w-full flex items-stretch justify-between py-6 px-2">
      <!-- Search server input -->
      <div class="w-2/6 rounded-md py-2 px-4 bg-slate-200">
        <input type="text" placeholder="Поиск по названию..." class="bg-slate-200 text-black">
      </div>

      <!-- Add server button -->
      <button class="w-1/6 rounded-md bg-indigo-400 py-1.5 flex items-center justify-center text-white">
        <RiAddLine />

        <p class="text-sm ml-1">Добавить сервер</p>
      </button>
    </div>

    <!-- Server list -->
    <section class="w-full flex flex-wrap">
      { #each servers as server }
        <div class="w-full rounded-md px-4 py-5 m-2 border-2 border-solid">
          <!-- Server logotype & Name -->
          <div class="flex items-center">
            <div class="w-10 relative">
              <div class="w-full" style="padding-top: 100%">
                <img class="absolute inset-0 w-full h-full rounded-md" alt="server logotype" src="{ server.logotype }" />
              </div>
            </div>

            <!-- Basic server information -->
            <div class="ml-3">
              <h1 class="text-xl">{ server.name }</h1>

              <div class="flex items-center flex-wrap">
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
            </div>
          </div>

          <!-- Advanced Server information -->
          <div class="mt-3">
            <!-- Owner server info -->
            <p class="mt-2 text-sm">{ server.description }</p>
          </div>

          <!-- Server controls -->
          <div class="w-full mt-2 pt-4 border-t-2 border-slate-100">
            <!-- Header -->
            <div class="w-full flex items-center justify-between">
              { #if server.isPanelOpened }
                <div>
                  <h1 class="text-slate-800 text-md font-semibold">Управление сервером</h1>
                </div>
              { /if }

              <button on:click={() => server.isPanelOpened = !server.isPanelOpened} class="rounded-md bg-indigo-400 py-1.5 px-4 flex items-center justify-center text-white">
                { #if server.isPanelOpened }
                  <RiArrowDropUpLine />
                { :else }
                  <RiSettings3Line />
                { /if }

                <p class="text-sm ml-1">{ server.isPanelOpened ? "Скрыть" : "Управление сервером" }</p>
              </button>
            </div>

            { #if server.isPanelOpened }
              <div class="rounded-md bg-slate-100">
                <!-- Delete server -->
                

                <!-- Update information -->
              </div>
            { /if }
          </div>
        </div>
      { /each }
    </section>
  { /if }
</div>