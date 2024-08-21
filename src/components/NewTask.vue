<script setup>
import { useTasksStore } from '@/stores/task';
import { storeToRefs } from "pinia"
import { onMounted } from 'vue';
const taskStore = useTasksStore();
const {
  labels,
  priorities,
  taskName,
  taskDescription,
  dueTime,
  dueDate,
  startTime,
  startDate,
  taskPrioprity,
  taskLabel,
} = storeToRefs(taskStore);
function setMinDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(today.getDate()).padStart(2, '0');
  const minDate = `${year}-${month}-${day}`;

  document.getElementById('start-date').setAttribute('min', minDate);
  document.getElementById('due-date').setAttribute('min', minDate);
}

onMounted(() => { taskStore.getLabels(); taskStore.getPriorities(); setMinDate(); })
</script>
<template>
  <div class="w-full hidden inset-0 absolute z-50 items-center justify-center  backdrop-blur-lg  font-Ubuntu">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Create New Task</h2>

      <form @submit.prevent="taskStore.addTask()">
        <!-- Task Name -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="task-name">
            Task Name
          </label>
          <input id="task-name" type="text" placeholder="Enter task name" v-model="taskName" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>

        <!-- Task Description -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="task-desc">
            Description
          </label>
          <textarea id="task-desc" placeholder="Enter task description" v-model="taskDescription" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <!-- Start Date -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="start-date">
            Start Date
          </label>
          <input id="start-date" type="date" v-model="startDate" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>

        <!-- start Time -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="start-time">
            Start Time
          </label>
          <input id="start-time" type="time" v-model="startTime" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <!-- Due Date -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="due-date">
            Due Date
          </label>
          <input id="due-date" type="date" v-model="dueDate" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>

        <!-- Due Time -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="due-time">
            Due Time
          </label>
          <input id="due-time" type="time" v-model="dueTime" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>

        <!-- Priority -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="priority">
            Priority
          </label>
          <select id="priority" v-model="taskPrioprity" required
            class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option disabled>Enter priority</option>
            <option v-for="priority in priorities" :key="priority">{{ priority }}</option>
          </select>
        </div>

        <!-- Labels -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="labels">
            Labels
          </label>
          <select id="labels" v-model="taskLabel" required
            class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option disabled>Enter label</option>
            <option v-for="label in labels" :key="label">{{ label.name }}</option>


          </select>
        </div>

        <!-- Submit Button -->
        <div class="flex items-center justify-between">
          <button type="submit"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add Task
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
