<script setup>
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    auth,
    setDoc,
    doc,
    db,
} from "@/db/firebase.js";
import { useUserStore } from "../stores/user.js";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
const isMenuVisible = ref(false);

const route = useRoute();

watch(
    () => route.path,
    (newPath, oldPath) => {
        if (isMenuVisible.value) {
            toggleMenu();
        }
    }
);
function toggleMenu() {
    const menu = document.getElementById("menu-bar");
    if (menu.classList.contains("hidden")) {
        isMenuVisible.value = true;
        menu.classList.remove("hidden");
        menu.classList.add("flex");
        menu.classList.add("absolute");
    } else {
        isMenuVisible.value = false;
        menu.classList.add("hidden");
        menu.classList.remove("flex");
        menu.classList.remove("absolute");
    }
}
onMounted(() => {
    // console.log(new Date(), new Date().getDate(),
    //     new Date().getMonth(),);
});
</script>
<template>
    <div class="relative bg-gradient-to-r from-purple-500 to-pink-500 min-h-screen overflow-y-auto">
        <div class="font-Ubuntu text-2xl font-bold tracking-widest px-10 py-4">
            TASK MATE
        </div>
        <div class="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-2 py-2 px-4 lg:p-10 ">
            <div
                class="bg-white lg:h-[50rem] flex flex-row lg:flex-col items-center space-y-4 w-full lg:w-96 p-4 lg:p-10 rounded-lg lg:relative">
                <div class="w-2/4 lg:w-full flex justify-start lg:justify-center">
                    <img class="w-10" src="../assets/imgs/default-profile-picture.png" alt="" />
                </div>
                <div class="font-bold text-3xl w-2/4 justify-end flex lg:hidden items-center pb-4">
                    <div @click="toggleMenu()"><i class="fa-solid fa-bars"></i></div>
                </div>
                <div id="menu-bar"
                    class="hidden lg:flex w-full p-10 lg:p-0 bg-white text-xl font-semibold top-0 right-0 bottom-0 z-30 flex-col space-y-5">
                    <div class="w-full flex lg:hidden justify-end text-2xl">
                        <div @click="toggleMenu()" class="animate-spin p-2">
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                    <router-link to="/Dashboard/Main" class="w-full flex space-x-2 items-center"><i
                            class="fa-solid fa-chalkboard-user"></i>
                        <p>Dashboard</p>
                    </router-link>
                    <router-link to="/Dashboard/Notes" class="w-full flex space-x-2 items-center"><i
                            class="fa-solid fa-note-sticky"></i>
                        <p>Notes</p>
                    </router-link>
                    <router-link to="/Dashboard/Tasks" class="w-full flex space-x-2 items-center"><i
                            class="fa-solid fa-list-check"></i>
                        <p>Tasks</p>
                    </router-link>
                    <div
                        class="w-full bg-inherit lg:absolute lg:bottom-10 right-0 lg:px-10 flex flex-col space-y-5 lg:space-y-2">
                        <button class="w-full flex space-x-2 items-center">
                            <i class="fa-solid fa-gear"></i>
                            <p>Settings</p>
                        </button>
                        <button @click="userStore.logOut()" class="w-full flex space-x-2 items-center">
                            <i class="fa-solid fa-right-from-bracket"></i>
                            <p>Logout</p>
                        </button>
                    </div>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>
