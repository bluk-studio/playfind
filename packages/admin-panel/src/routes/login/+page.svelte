<script lang="ts">
  import { goto } from "$app/navigation";

  // Importing modules
  import { Client } from "../../client";
  import { User } from "../../stores";

  // Variables
  let isLoading = false;
  let token: string;

  // Function, that'll handle our login
  // logic
  async function handleLogin() {
    isLoading = true;

    // Checking token (if exists)
    if (token) {
      const isAuthorized = await User.authorize(token);
      if (isAuthorized) {
        // Redirecting user to servers page
        goto("/home");
      };
    };

    isLoading = false;

    // Showing error
  };
</script>

<section class="w-full h-screen flex items-center justify-center">
  <div class="w-1/3 bg-gray-100 rounded-md px-6 py-6">
    <!-- Header -->
    <div class="flex flex-col items-center justify-center text-center">
      <h1 class="text-2xl text-black">Авторизация</h1>
      <p class="w-2/3 text-sm text-black text-opacity-70">Что бы продолжить, вам нужно авторизоваться.</p>
    </div>

    <!-- Input -->
    <div class="my-4">
      <div class="w-full rounded-md py-2 px-4 bg-gray-300">
        <input bind:value={token} type="text" placeholder="Токен" class="bg-gray-300 text-black">
      </div>

      <p class="text-xs mt-0.5">Токен. <span>Lorem ipsum dolor sit amet.</span></p>
    </div>

    <!-- Button -->
    <div>
      <button on:click={() => handleLogin()} class="w-full rounded-full bg-indigo-400 py-1.5">
        <p class="text-sm text-white">Авторизоваться</p>
      </button>
    </div>
  </div>
</section>