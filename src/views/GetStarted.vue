<template>

  <div class="bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col items-center justify-center  min-h-screen">
    <header class="w-full p-6 text-white flex flex-col space-y-3 items-center">
    <h1 class="font-Ubuntu text-2xl font-bold tracking-widest  ">TASK MATE</h1>
    <div class="text-lg font-medium tracking-wide flex flex-col items-center text-center">Welcome to Your Productivity Hub!</div>
  </header>

<div class="w-full p-6 flex justify-center">
  <div class="bg-white  rounded-lg shadow-lg p-6 lg:p-12 flex flex-col lg:flex-row items-center lg:max-w-4xl w-full">
  <!-- Left Side - Login Form -->
<router-view></router-view>

  <!-- Right Side - Image -->
  <div class="hidden lg:block lg:w-1/2">
    <img src="../assets/imgs/Wavy_Bus-15_Single-10.jpg" alt="Illustration" class="w-full h-auto">
  </div>
</div>
</div>
</div>
</template>

<script setup>

 </script>
<style></style>
