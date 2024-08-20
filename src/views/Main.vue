<script setup>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';



let currentDate = new Date();

function renderCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const monthYear = document.getElementById('monthYear');
    calendarDays.innerHTML = '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    // Padding for previous month's dates
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.innerHTML += `<div></div>`;
    }

    // Current month's dates
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.innerHTML += `<div class="text-gray-800 bg-gray-200 px-4 py-2 flex items-center justify-center rounded-lg cursor-pointer hover:bg-purple-300 transition">${day}</div>`;
    }
}
function getChart() {
    const data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    new Chart(
        document.getElementById('acquisitions'),
        {
            type: 'pie',
            data: data,
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Custom Chart Title'
                    }
                }
            }
        }
    );


}
function prevMonthCal() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonthCal() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

onMounted(() => {
    renderCalendar();
    getChart();
});


</script>
<template>
    <div class="flex w-full container space-x-10 px-6 relative overflow-x-auto">
        <div class="flex flex-col space-y-10 items-center">
            <div class="flex space-x-4">
                <div class="bg-white rounded-lg  w-[512px] h-72"></div>
                <div class="bg-white  rounded-lg w-[512px] h-72"></div>
            </div>
            <div style="width: 500px;"><canvas id="acquisitions"></canvas></div>
        </div>
        <div class="bg-white shadow-lg rounded-lg p-10 pr-16 w-[512px] flex flex-col space-y-2 items-center mx-auto ">
            <!-- Calendar Header -->
            <div class="w-full flex space-x-2 justify-between items-center mb-4 ">
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
