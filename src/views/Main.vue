<script setup>
import { useTasksStore } from "@/stores/task";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { getChart } from "@/utilities/getChart";

const taskStore = useTasksStore();
const { tasks, sortedAndFilteredTasks, currentFilter } = storeToRefs(taskStore);

const currentDate = new Date();

function renderCalendar() {
    const calendarDays = document.getElementById("calendarDays");
    const monthYear = document.getElementById("monthYear");
    calendarDays.innerHTML = "";
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
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
        calendarDays.innerHTML += `<div  class="text-gray-800 bg-gray-200 px-4 py-2 flex items-center justify-center rounded-lg cursor-pointer hover:bg-purple-300 transition">${day}</div>`;
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

onMounted(async () => {
    await taskStore.checkAndArchiveTasks();

    await taskStore.sortAndFilterTasks("Recent");
    renderCalendar();
    chartJs();
});
</script>
<template>
    <div class="flex w-full h-[50rem] container space-x-10 px-6 relative overflow-x-auto">
        <div class="flex flex-col space-y-10 items-center">
            <div class="flex space-x-4">
                <div class="bg-white rounded-lg w-[512px] h-[240px] flex flex-col space-y-2 relative">
                    <div class="text-md border-b border-gray-500 p-4 font-semibold">
                        Tasks
                    </div>
                    <div class="flex-col p-2 h-full overflow-y-auto space-y-3">
                        <div class="bg-gray-300 p-4 rounded-md flex space relative"
                            v-for="task in sortedAndFilteredTasks.slice(0, 3)" :key="task">
                            <div class="truncate w-3/4">{{ task.name }}</div>
                            <div class="flex space-x-2 px-2 items-center justify-start w-1/4 font-medium">
                                <i :class="[
                                    'fa-solid',
                                    'fa-folder',
                                    `text-[${task.label.color.trim()}]`,
                                ]"></i>
                                <p>{{ task.label.name }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="absolute bottom-0 w-full bg-white opacity-45 p-8 rounded-lg"></div>
                    <router-link class="absolute bottom-2 z-10 right-2 p-2 underline" to="/Dashboard/Tasks">See
                        all</router-link>
                </div>
                <div class="bg-white rounded-lg w-[512px] h-[240px] flex flex-col space-y-2 ">
                    <div class="text-md border-b border-gray-500 p-4 font-semibold">
                        Today's Activity(s)
                    </div>
                    <div class="flex-col p-2 h-full overflow-y-auto space-y-3">
                    </div>
                </div>
            </div>
            <div style="width: 900px"><canvas id="acquisitions"></canvas></div>
        </div>
        <div class="bg-white shadow-lg rounded-lg p-10 pr-16 w-[512px] flex flex-col space-y-2 items-center mx-auto">
            <!-- Calendar Header -->
            <div class="w-full flex space-x-2 justify-between items-center mb-4">
                <button @click="prevMonthCal" id="prevMonth"
                    class="text-gray-500 hover:text-gray-800 focus:outline-none">
                    &lt;
                </button>
                <div id="monthYear" class="text-lg font-semibold text-gray-800"></div>
                <button @click="nextMonthCal" id="nextMonth"
                    class="text-gray-500 hover:text-gray-800 focus:outline-none">
                    &gt;
                </button>
            </div>

            <!-- Calendar Days of the Week -->
            <div class="w-full grid grid-cols-7 gap-10 text-center text-gray-600 font-semibold">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>

            <!-- Calendar Dates -->
            <div id="calendarDays" class="w-full grid grid-cols-7 gap-10 mt-4"></div>
        </div>
    </div>
</template>
