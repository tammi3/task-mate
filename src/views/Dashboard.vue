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
console.log(new Date(), new Date().getDate(),
    new Date().getMonth(),)
</script>
<template>
    <div class="relative bg-gradient-to-r from-purple-500 to-pink-500 min-h-screen ">
        <h1 class="font-Ubuntu text-2xl font-bold tracking-widest  px-10 pt-4">TASK MATE</h1>
        <div class="flex space-x-2 p-10 ">
            <div class="bg-white h-[50rem] flex flex-col items-center space-y-4 w-96 p-10 rounded-lg relative">

                <img class="w-10" src="../assets/imgs/default-profile-picture.png" alt="">
                <router-link to="/Dashboard/Main" class="w-full text-xl font-semibold flex space-x-2 items-center"><i
                        class="fa-solid fa-chalkboard-user"></i>
                    <p>Dashboard</p>
                </router-link>
                <router-link to="/Dashboard/Notes" class="w-full text-xl font-semibold flex space-x-2 items-center"><i
                        class="fa-solid fa-note-sticky"></i>
                    <p> Notes</p>
                </router-link>
                <router-link to="/Dashboard/Tasks" class="w-full text-xl font-semibold flex space-x-2 items-center"><i
                        class="fa-solid fa-list-check"></i>
                    <p>Tasks</p>
                </router-link>
                <div class="w-full absolute bottom-10 left-10 flex flex-col space-y-2">
                    <button class="w-full text-xl font-semibold flex  space-x-2 items-center "> <i
                            class="fa-solid fa-gear"></i>
                        <p>Settings</p>
                    </button>
                    <button class="w-full text-xl font-semibold flex  space-x-2 items-center "> <i
                            class="fa-solid fa-right-from-bracket"></i>
                        <p>Logout</p>
                    </button>
                </div>

            </div>
            <router-view></router-view>
        </div>

    </div>
</template>
