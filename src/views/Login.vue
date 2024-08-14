<script setup>
import { userStore } from "../stores/user.js";
import { storeToRefs } from "pinia";
const useUserStore = userStore();
const { email, password, loading, error } = storeToRefs(useUserStore);
function handleSubmit() {
  useUserStore.loginUser();
}
</script>
<template>
  <div class="w-full lg:w-1/2">
    <h2 class="text-3xl font-bold text-gray-800 mb-4">Login</h2>
    <p class="text-gray-600 mb-8">
      Don’t have an account yet?
      <router-link to="/Signup" class="text-purple-600 font-medium"
        >Register</router-link
      >
    </p>

    <form @submit.prevent="handleSubmit">
      <div v-if="error != ''" class="mb-4">
        <p class="block text-sm font-medium text-red-500">{{ error }}</p>
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Email Address</label
        >
        <input
          type="email"
          id="email"
          placeholder="johndoe@example.com"
          @keydown="error = ''"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
      </div>

      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700"
          >Password</label
        >
        <input
          type="password"
          id="password"
          placeholder="Enter 6 characters or more"
          @keydown="error = ''"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
        <a
          href="#"
          class="text-sm text-purple-600 hover:underline mt-2 inline-block"
          >Forgot Password?</a
        >
      </div>

      <button
        type="submit"
        class="w-full bg-purple-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300"
      >
        Login
      </button>
    </form>

    <div class="mt-6 flex items-center justify-between">
      <span class="border-t w-full mr-2 border-gray-300"></span>
      <span class="text-gray-500 w-full">or login with</span>
      <span class="border-t w-full border-gray-300"></span>
    </div>

    <div class="flex mt-6">
      <button
        class="w-full bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition duration-300"
      >
        <img
          src="https://img.icons8.com/color/48/000000/google-logo.png"
          alt="Google"
          class="w-5 h-5 inline mr-2"
        />
        Google
      </button>
    </div>
  </div>
</template>

<style scoped></style>
