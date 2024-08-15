<template>
    <div class="relative bg-gradient-to-r from-purple-500 to-pink-500 min-h-screen ">
<div class="fixed z-20 inset-0 top-[1rem] left-[1rem)] right-auto w-[9rem] bottom-[1rem] pb-10 pl-8 pr-6 overflow-y-auto rounded-lg bg-white shadow-lg shadow-gray-300">dd</div>
    </div>
</template>

<script setup >
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
 console.log(new Date(),new Date().getDate(),
 new Date().getMonth() ,)
</script>

