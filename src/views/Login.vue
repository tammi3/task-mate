<script setup></script>
<template>
  <div class="w-full flex flex-col-reverse space-y-4 lg:flex-row lg:space-x-4">
    <div class="w-full lg:w-2/4 flex items-center bg-cyan-blue rounded-tr-[150px]">
      <div class="w-full max-w-xl flex flex-col justify-center items-center p-10 mx-auto">
        <form class="w-full flex flex-col space-y-4" action="">
          <div class="flex flex-col space-y-2">
            <label for="email" class="block mb-2 text-lg font-medium text-gray-900"
              >Email</label
            >
            <input
              type="email"
              name="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>
          <div class="flex flex-col space-y-2">
            <label for="password" class="block mb-2 text-lg font-medium text-gray-900"
              >Password</label
            >
            <input
              type="password"
              name="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>
          <p class="font-normal tracking-wide">
            Don't have an account?
            <router-link
              to="/Signup"
              class="cursor-pointer border-b border-gray-400 hover:border-gray-800"
              >Register here</router-link
            >
          </p>
        </form>
      </div>
    </div>
    <div class="w-full lg:w-2/4">
      <img class="w-[800px] rounded-2xl" src="../assets/imgs/4865096.jpg" alt="" />
    </div>
  </div>
</template>

<style scoped></style>
