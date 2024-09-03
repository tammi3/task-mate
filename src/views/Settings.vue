<script setup>
import { onMounted } from "vue";
import { useUserStore } from "../stores/user.js";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
onMounted(() => {
    userStore.getUserInfo();
})
</script>
<template>
    <div class="mx-auto  shadow-lg   w-full lg:container bg-white rounded-lg p-4 lg:p-6 flex flex-col space-y-10">
        <h1 class="text-2xl font-bold mb-6">Account Settings</h1>

        <!-- Profile Picture Update -->
        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4">Update Profile Picture</h2>
            <div class="flex flex-col md:flex-row items-center">
                <img src="https://via.placeholder.com/100" alt="Profile Picture" class="w-20 h-20 rounded-full">
                <div class="relative">
                    <!--default html file upload button-->
                    <input v-if="!userInfo.updatedProfileImage" class="opacity-0" type="file"
                        accept="image/png, image/jpeg" id="inputFile" v-on:change="uploadImage" />

                    <!--custom html file upload button-->
                    <label v-if="!userInfo.updatedProfileImage" for="inputFile"
                        class="absolute w-56 h-8 uppercase cursor-pointer font-bold rounded hover:translate-x-0 hover:-translate-y-2 hover:shadow-lg transform duration-200 ease-in-out border bg-gray-600 text-white hover:shadow-gray-600/60 border-gray-600 p-4 justify-center items-center flex">

                        <span>Update image</span>
                    </label>
                    <!--default html file upload button-->
                    <!-- <input v-if="!userInfo.updatedProfileImage" class="opacity-0" type="file"
                        accept="image/png, image/jpeg" id="inputFile" v-on:change="uploadImage" /> -->

                    <!--custom html file upload button-->
                    <!-- <label v-if="!userInfo.updatedProfileImage" for="inputFile"
                        class="absolute w-56 h-8 uppercase cursor-pointer font-bold rounded-xl hover:translate-x-0 hover:-translate-y-2 hover:shadow-lg transform duration-200 ease-in-out border bg-gray-600 text-white hover:shadow-gray-600/60 border-gray-600 p-4 justify-center items-center flex">
                        <img v-if="loadingUpdateImg" class="animate-spin-slow w-6" src="../assets/loading.png" alt="" />
                        <span v-if="!loadingUpdateImg"> Update image</span>
                    </label> -->
                </div>
            </div>
        </div>

        <!-- Edit Display Name -->
        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4">Edit Display Name</h2>
            <!-- <div>
                <label for="displayName" class="block text-sm font-medium text-gray-700">Display Name</label>
                <input type="text" id="displayName" name="displayName"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            </div> -->
        </div>

        <!-- Display Email and Name -->
        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4">Account Information</h2>
            <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-gray-700">Name: <span class="font-semibold">{{ userInfo.name.firstname }} {{
                    userInfo.name.lastname }}</span></p>
                <p class="text-gray-700">Email: <span class="font-semibold">{{ userInfo.email }}</span></p>
            </div>
        </div>

        <!-- Delete Account -->
        <div class="mb-8">
            <h2 class="text-xl font-semibold text-red-600 mb-4">Delete Account</h2>
            <p class="text-red-600">Warning: This action cannot be undone.</p>
            <button class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Delete Account
            </button>
        </div>
    </div>
</template>
