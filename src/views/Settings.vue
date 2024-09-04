<script setup>
import { onMounted } from "vue";
import { useUserStore } from "../stores/user.js";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { userInfo, profileImg, loadingUpdateImg, loadingDeleteImg } = storeToRefs(userStore);
onMounted(() => {

})
</script>
<template>
    <div v-if="userInfo.name"
        class="mx-auto  shadow-lg   w-full lg:container bg-white rounded-lg px-4 py-8 lg:p-6 flex flex-col space-y-10">
        <h1 class="text-2xl font-bold mb-6">Account Settings</h1>

        <!-- Profile Picture Update -->
        <div class="mb-8">

            <div class="flex flex-col space-y-8  md:flex-row md:space-x-10 items-center md:justify-start relative">
                <!-- default profile image -->
                <img v-if="!userInfo.updatedProfileImage" id="updateImg" class="w-32 h-32 rounded-full object-cover"
                    src="../assets/imgs/default-profile-picture.png" alt="Profile Picture" />
                <!-- custom profile image -->
                <img v-show="userInfo.updatedProfileImage" id="profileImg" class="w-32 h-32 rounded-full object-cover"
                    :src="profileImg" alt="Profile Picture" />

                <div v-if="!userInfo.updatedProfileImage" class="relative w-56 h-8 flex items-center">
                    <!--default html file upload button-->
                    <input class=" w-56 h-8 opacity-0" type="file" accept="image/png, image/jpeg" id="inputFile"
                        @change="userStore.uploadImage" />

                    <!--custom html file upload button-->
                    <label for="inputFile"
                        class="absolute inset-0 w-56 h-8 uppercase cursor-pointer font-bold rounded hover:translate-x-0 hover:-translate-y-2 hover:shadow-lg transform duration-200 ease-in-out border bg-gray-600 text-white hover:shadow-gray-600/60 border-gray-600 p-4 justify-center items-center flex">

                        <img v-if="loadingUpdateImg" class="animate-spin-slow w-6" src="../assets/loading.png" alt="" />
                        <span v-else> Update image</span>
                    </label>
                </div>
                <!-- delete image -->
                <button @click="userStore.deleteImage" v-else
                    class="w-56 h-8 uppercase cursor-pointer font-bold rounded hover:translate-x-0 hover:-translate-y-2 hover:shadow-lg transform duration-200 ease-in-out border bg-gray-600 text-white hover:shadow-gray-600/60 border-gray-600 p-4 justify-center items-center flex">
                    <img v-if="loadingDeleteImg" class="animate-spin-slow w-6" src="../assets/loading.png" alt="" />
                    <span v-if="!loadingDeleteImg">Delete image</span>
                </button>
            </div>
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
