<template>
    <div>
      <div
        class="w-full container p-6 lg:p-10 mx-auto flex flex-col space-y-4 lg:flex-row lg:space-x-4 items-center"
      >
        <div
          class="bg-cyan-blue w-full lg:w-2/4 welcome-message p-16 lg:p-20 h-full flex flex-col justify-center space-y-4"
        >
          <p class="w-full text-lg">
            Welcome to Your Productivity Hub! Ready to Conquer Your Day? We're excited to
            have you here! Whether you're planning your day, managing projects, or just
            trying to stay organized, our to-do list app is designed to help you achieve
            your goals with ease.
          </p>
          <router-link
            to="/Login"
            class="text-xl font-bold rounded-md w-44 p-4 h-10 flex justify-center items-center border-gray-700 border-2"
          >
            GET STARTED
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup></script>
  <style scoped>
  .welcome-message {
    border-radius: 155px 0px 0px 37px;
    -webkit-border-radius: 155px 0px 0px 37px;
    -moz-border-radius: 155px 0px 0px 37px;
  }
  </style>
  