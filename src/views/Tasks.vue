<script setup>
import NewTask from "@/components/NewTask.vue";
import { useTasksStore } from '@/stores/task';
import { storeToRefs } from "pinia"
import { onMounted } from 'vue';
const taskStore = useTasksStore();
const { tasks } = storeToRefs(taskStore);
onMounted(() => { taskStore.getTasks(); })
</script>
<template>
    <div class="container bg-white rounded-lg p-6 flex flex-col space-y-10">
        <div class="bg-gray-100 w-full flex space-x-2 justify-between p-2 rounded-lg text-md font-semibold">
            <button class="flex justify-center items-center p-2 space-x-2">
                <i class="fa-solid fa-clock"></i><span>Recent</span>
            </button>
            <button class="flex justify-center items-center p-2 space-x-2">
                <i class="fa-solid fa-square-check"></i><span>Completed</span>
            </button>
            <button class="flex justify-center items-center p-2 space-x-2">
                <i class="fa-solid fa-box-archive"></i><span>Archived</span>
            </button>
            <button class="flex justify-center items-center p-2 space-x-2">
                <i class="fa-solid fa-trash-can"></i><span>Deleted</span>
            </button>
            <button class="flex justify-center items-center p-2 space-x-2">
                <i class="fa-solid fa-box-archive"></i><span>Add Task</span>
            </button>
        </div>
        <div class="w-full flex flex-col h-[40rem] space-y-3 overflow-y-auto relative">
            <div v-for="task in tasks" :key="task" class="bg-gray-200 px-2 py-4 flex items-center rounded-lg">
                <label class="checkbox">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                </label>
                <div>{{ task.name }}</div>
            </div>

        </div>
        <NewTask />
    </div>
</template>
<style>
.checkbox {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 25px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

/* Create a custom checkbox */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 30px;
    width: 30px;
    border-style: solid;
    border-width: 2px;
    border-radius: 5px;
    border-color: #373737;
}

/* On mouse-over, add a grey background color */
.checkbox:hover input~.checkmark {
    background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.checkbox input:checked~.checkmark {
    background-color: #000000;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the checkmark when checked */
.checkbox input:checked~.checkmark:after {
    display: block;
}

/* Style the checkmark/indicator */
.checkbox .checkmark:after {
    left: 9px;
    top: 5px;
    width: 7px;
    height: 13px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
</style>
