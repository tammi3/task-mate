<script setup>
import { useTasksStore } from "@/stores/task";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { getChart } from "@/utilities/getChart";
import data from "@/db/quotes.json";

const quoteOfTheDay = ref("");
const todayTasks = ref("");
const quotes = data.quotes;
const taskStore = useTasksStore();
const { tasks, sortedAndFilteredTasks, currentFilter } = storeToRefs(taskStore);

const currentDate = new Date();

function renderCalendar() {
  const calendarDays = document.getElementById("calendarDays");
  const monthYear = document.getElementById("monthYear");
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  calendarDays.innerHTML = "";
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = `${currentDate.toLocaleString("default", {
    month: "long",
  })} ${year}`;

  // Padding for previous month's dates
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.innerHTML += `<div></div>`;
  }

  // Current month's dates
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    // Check if there's a task for the current day by matching the due_date
    const hasTask = tasks.value.some((task) => task.start_date === dateStr);

    // Highlight if the day has a task
    const dayClass = hasTask
      ? "text-white bg-purple-600" // Highlighted color for task days
      : "text-gray-800 bg-gray-200"; // Default color for non-task days

    calendarDays.innerHTML += `<div  class="${dayClass} text-gray-800 bg-gray-200 px-4 py-2 flex items-center justify-center rounded-lg cursor-pointer hover:bg-purple-300 transition">${day}</div>`;
  }
}
function prevMonthCal() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function nextMonthCal() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}
function chartJs() {
  getChart();
}

function getRandomIndexForToday(arrayLength) {
  // Get the current date (year, month, and day)
  const today = new Date().toDateString(); // Example: "Tue Sep 03 2024"

  // Use the date string as a seed for a hash function to get a pseudo-random number
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = today.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the hash to a positive number and get the index within the array's length
  const index = Math.abs(hash) % arrayLength;

  return index;
}
async function getTodayTasks() {
  await taskStore.sortAndFilterTasks("Recent");
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDay();
  const todayDateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
    today
  ).padStart(2, "0")}`;
  todayTasks.value = sortedAndFilteredTasks.value.filter(
    (task) => task.start_date === todayDateStr
  );
}
onMounted(async () => {
  await taskStore.checkAndArchiveTasks();
  await getTodayTasks();
  renderCalendar();
  chartJs();
  const randomIndex = getRandomIndexForToday(quotes.length);
  quoteOfTheDay.value = quotes[randomIndex];
});
</script>
<template>
  <div
    class="flex flex-col lg:flex-row w-full lg:h-[50rem] lg:container space-y-10 lg:space-y-0 lg:space-x-10 lg:px-6 relative lg:overflow-x-auto"
  >
    <div class="flex flex-col space-y-10 items-center">
      <div
        class="flex flex-col space-y-4 w-full lg:flex-row lg:space-x-4 lg:space-y-0"
      >
        <div
          class="bg-white rounded-lg w-full lg:w-[512px] h-[240px] flex flex-col space-y-2 relative"
        >
          <div class="text-md border-b border-gray-500 p-4 font-semibold">
            Tasks
          </div>
          <div class="flex flex-col p-2 h-full overflow-y-auto space-y-3">
            <div
              v-if="todayTasks.length == 0"
              class="justify-center items-center h-full w-full text-md font-semibold flex relative"
            >
              No tasks today :(
            </div>
            <div
              v-else
              class="bg-gray-300 p-4 rounded-md flex relative"
              v-for="task in todayTasks"
              :key="task"
            >
              <div class="truncate w-3/4">{{ task.name }}</div>
              <div
                class="flex space-x-2 px-2 items-center justify-start w-1/4 font-medium"
              >
                <i
                  :class="[
                    'fa-solid',
                    'fa-folder',
                    task.label.name == 'Work' ? 'text-work' : '',
                    task.label.name == 'Others' ? 'text-others' : '',
                    task.label.name == 'Personal' ? 'text-personal' : '',
                    task.label.name == 'School' ? 'text-school' : '',
                  ]"
                ></i>
                <p>{{ task.label.name }}</p>
              </div>
            </div>
          </div>
          <div
            class="absolute bottom-0 w-full backdrop-blur-md opacity opacity-75 px-8 pb-8 pt-[29px] rounded-b-lg"
          ></div>
          <router-link
            class="absolute bottom-2 z-10 right-2 p-2 underline"
            to="/Dashboard/Tasks"
            >See all</router-link
          >
        </div>
        <div
          class="bg-white rounded-lg w-full lg:w-[512px] h-[240px] flex flex-col space-y-2"
        >
          <div class="text-lg border-b border-gray-500 p-4 font-semibold">
            Quote of the day
          </div>
          <div
            class="flex px-6 text-center py-4 h-full overflow-y-auto space-y-3 text-lg font-semibold justify-center items-center"
          >
            {{ quoteOfTheDay }}
          </div>
        </div>
      </div>
      <div class="w-full flex md:justify-center overflow-x-auto">
        <div style="width: 900px">
          <canvas id="acquisitions" class="h-[300px] lg:h-full"></canvas>
        </div>
      </div>
    </div>
    <div
      class="bg-white shadow-lg rounded-lg px-4 py-8 md:p-10 lg:pr-16 w-full lg:w-[512px] flex flex-col space-y-2 items-center mx-auto"
    >
      <!-- Calendar Header -->
      <div class="w-full flex space-x-2 justify-between items-center mb-4">
        <button
          @click="prevMonthCal"
          id="prevMonth"
          class="text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          &lt;
        </button>
        <div id="monthYear" class="text-lg font-semibold text-gray-800"></div>
        <button
          @click="nextMonthCal"
          id="nextMonth"
          class="text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          &gt;
        </button>
      </div>

      <!-- Calendar Days of the Week -->
      <div
        class="w-full grid grid-cols-7 gap-4 md:gap-10 text-center text-gray-600 font-semibold"
      >
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      <!-- Calendar Dates -->
      <div
        id="calendarDays"
        class="w-full grid grid-cols-7 gap-4 md:gap-10 mt-4"
      ></div>
    </div>
  </div>
</template>
