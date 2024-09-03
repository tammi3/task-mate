<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useTasksStore } from "@/stores/task";
import { storeToRefs } from "pinia";
import { onMounted, watch, ref } from "vue";
const taskStore = useTasksStore();
const {
    tasks,
    sortedAndFilteredTasks,
    priorities,
    currentFilter,
    filters,
    filteredTasks,
    sortBy,
    filterByPriority,
} = storeToRefs(taskStore);
const route = useRoute();
const router = useRouter();
const task = sortedAndFilteredTasks.value[route.params.id];
function returnToTasks() {
    const previousRoute = router.options.history.state.back;
    router.push({ path: previousRoute });
}


</script>
<template>
    <div
        class="w-full lg:h-[50rem] lg:overflow-y-auto lg:container flex flex-col space-y-8 bg-white rounded-lg px-4 py-6 md:p-10 ">
        <div class="flex flex-col space-y-10">
            <div class="text-xl md:text-3xl font-bold uppercase  w-full ">{{ task.name }}</div>
            <div class="flex flex-col space-y-2">
                <div class="font-bold text-xl uppercase">Description</div>
                <div class="text-lg pl-4">{{ task.description }}</div>
            </div>
            <div class="flex flex-col space-y-2">
                <div class="font-bold text-xl uppercase">Start</div>
                <div class="flex flex-col space-y-4 md:space-y-0 md:flex-row max-w-lg md:space-x-4 pl-4">
                    <div class="flex flex-col space-y-2 w-full md:w-2/4">
                        <h1 class="font-semibold text-lg">Date</h1>
                        <div>{{
                            new Date(
                                `${task.start_date}T${task.start_time}`
                            ).toLocaleDateString("en-US", {

                                weekday: "long",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })
                        }}</div>
                    </div>
                    <div class="flex flex-col space-y-2 w-2/4">
                        <h1 class="font-semibold text-lg">Time</h1>
                        <div> {{
                            new Date(
                                `${task.start_date}T${task.start_time}`
                            ).toLocaleTimeString("en-US")
                        }}</div>
                    </div>
                </div>

            </div>
            <div class="flex flex-col space-y-2">
                <div class="font-bold text-xl uppercase">Deadline</div>
                <div class="flex flex-col space-y-4 md:space-y-0 md:flex-row max-w-lg md:space-x-4 pl-4">
                    <div class="flex flex-col space-y-2 w-full md:w-2/4">
                        <h1 class="font-semibold text-lg">Date</h1>
                        <div>{{
                            new Date(
                                `${task.due_date}T${task.due_time}`
                            ).toLocaleDateString("en-US", {

                                weekday: "long",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })
                        }}</div>
                    </div>
                    <div class="flex flex-col space-y-2 w-2/4">
                        <h1 class="font-semibold text-lg">Time</h1>
                        <div> {{
                            new Date(
                                `${task.due_date}T${task.due_time}`
                            ).toLocaleTimeString("en-US")
                        }}</div>
                    </div>
                </div>

            </div>
            <div class="flex flex-col space-y-2">
                <div class="font-bold text-xl uppercase">Status</div>
                <div :class="['text-lg', 'pl-4', task.isCompleted ? 'text-green-600' : 'text-red-600']">{{
                    task.isCompleted ? 'Completed' : 'Pending' }} </div>
                <div class="pl-4 text-lg" v-if="task.isArchived">You missed the deadline {{
                    `${taskStore.daysUntilDeadline(`${task.due_date}T${task.due_time}`)}`.slice(1, 2) }} day(s) ago.
                </div>
            </div>

            <div class="text-lg font-semibold underline flex py-2 items-center">
                <p @click="returnToTasks" class="cursor-pointer py-1"><i class="fa-solid fa-chevron-left pr-2"></i>Back
                </p>
            </div>


        </div>

    </div>
</template>
