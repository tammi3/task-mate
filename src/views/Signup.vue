<script setup></script>
<template>
  <div class="w-full flex flex-col lg:flex-row">
    <div class="w-full lg:w-2/4">
      <img class="w-[800px] rounded-2xl" src="../assets/imgs/4914544.jpg" alt="" />
    </div>
    <div
      class="w-full lg:w-2/4 flex items-center bg-cyan-blue rounded-tr-[150px] lg:rounded-tl-[150px] lg:rounded-tr-none"
    >
      <div
        class="w-full max-w-xl flex flex-col justify-center items-center p-10 lg:p-16 mx-auto"
      >
        <form class="w-full flex flex-col space-y-4" action="">
          <div class="flex flex-col space-y-2">
            <label for="fname" class="block mb-2 text-lg font-medium text-gray-900"
              >First Name</label
            >
            <input
              type="text"
              name="fname"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>
          <div class="flex flex-col space-y-2">
            <label for="lname" class="block mb-2 text-lg font-medium text-gray-900"
              >Last Name</label
            >
            <input
              type="text"
              name="lname"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>
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
            Already have an account?
            <router-link
              to="/Login"
              class="cursor-pointer border-b border-gray-400 hover:border-gray-800"
              >Login here</router-link
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
