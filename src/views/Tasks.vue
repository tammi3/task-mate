<script setup>
import ManageTask from "@/components/ManageTask.vue";
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
const showModal = ref(false);
const loading = ref(false);
watch(currentFilter, (newcurrentFilter, oldcurrentFilter) => {
    if (oldcurrentFilter !== newcurrentFilter) {
        taskStore.resetSortAndFilter(newcurrentFilter);
        setTimeout(() => {
            if (sortedAndFilteredTasks.value.length > 0) {
                loading.value = false;
            } else {
                loading.value = true;
            }
        }, 1000);
    }
});
function toggleTaskModal() {
    if (showModal.value === true) {
        taskStore.resetManageTask();
    }
    showModal.value = !showModal.value;
}
function daysUntilDeadline(deadlineDate) {
    const currentDate = new Date();
    const deadline = new Date(deadlineDate);

    // Calculate the difference in time (in milliseconds)
    const differenceInTime = deadline - currentDate;

    // Convert time difference from milliseconds to days
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

    return differenceInDays;
}


onMounted(async () => {
    taskStore.getPriorities();

    await taskStore.sortAndFilterTasks(currentFilter.value);
});
</script>
<template>
    <div class="w-full overflow-x-auto lg:container bg-white rounded-lg p-6 flex flex-col space-y-10">
        <div class="flex flex-col space-y-2 w-full">
            <div
                class="bg-gray-100 lg:w-full w-[55rem] flex space-x-2 justify-around p-2 rounded-lg text-md font-semibold">
                <button v-for="filter in filters" :key="filter" @click="taskStore.sortAndFilterTasks(filter.name)"
                    :class="[
                        'flex',
                        'justify-center',
                        'items-center',
                        'p-2',
                        'w-1/4',
                        'space-x-2',
                        currentFilter === filter.name
                            ? ['border', 'border-2', 'border-gray-700', 'rounded-md']
                            : '',
                    ]">
                    <i :class="filter.icon"></i><span>{{ filter.name }}</span>
                </button>
                <button @click="toggleTaskModal" class="flex justify-center items-center p-2 space-x-2 w-1/4">
                    <i class="fa-solid fa-box-archive"></i><span>Add Task</span>
                </button>
            </div>
            <div class="max-w-sm flex space-x-4">
                <div class="flex-col flex space-y-2 w-2/4">
                    <label for="sort">Sort by</label>
                    <select id="sort" v-model="sortBy" @change="taskStore.sortAndFilterTasks(currentFilter)"
                        class="block appearance-none rounded-md bg-white border border-gray-300 hover:border-gray-500 p-2 shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option selected>Newest</option>
                        <option>Oldest</option>
                        <option>A-Z</option>
                        <option>Z-A</option>
                    </select>
                </div>
                <div class="flex-col flex space-y-2 w-2/4">
                    <label for="priority">Priority</label>
                    <select id="priority" v-model="filterByPriority"
                        @change="taskStore.sortAndFilterTasks(currentFilter)"
                        class="block appearance-none rounded-md bg-white border border-gray-300 hover:border-gray-500 p-2 shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option selected>Any</option>
                        <option v-for="priority in priorities" :key="priority">
                            {{ priority }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div v-if="!loading" class="w-[55rem] lg:w-full flex flex-col h-[30rem] space-y-3 overflow-y-auto ">
            <div v-for="task in sortedAndFilteredTasks" :key="task"
                class="w-full bg-gray-200 px-2 py-4 flex items-center rounded-lg relative">
                <label @click="taskStore.taskCompleted(task)" v-if="!task.isCompleted"
                    class="checkbox flex items-start">
                    <input type="checkbox" />
                    <span class="checkmark "></span>
                </label>
                <div class="flex space-x-4 w-full">
                    <div class="w-[45%] lg:w-2/4 px-2 break-words">{{ task.name }}</div>


                    <div class="flex space-x-2 w-1/4 items-center">
                        <p>
                            {{
                                new Date(
                                    `${task.start_date}T${task.start_time}`
                                ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        </p>
                        <p>
                            {{
                                new Date(
                                    `${task.start_date}T${task.start_time}`
                                ).toLocaleTimeString("en-US")
                            }}
                        </p>
                    </div>
                    <div class=" w-1/4 relative">
                        <div v-if="!task.isCompleted && !task.isArchived" class="flex space-x-2 w-3/4 items-center">
                            {{ daysUntilDeadline(`${task.due_date}T${task.due_time}`) }} day(s) till deadline.

                        </div>
                        <div v-if="!task.isCompleted && task.isArchived" class="flex space-x-2 w-3/4 items-center">
                            Deadline was {{ `${daysUntilDeadline(`${task.due_date}T${task.due_time}`)}`.slice(1, 2) }}
                            day(s)
                            ago.

                        </div>
                        <div class="w-1/4">
                            <div v-if="!task.isCompleted" @click="taskStore.toggleOptions(task.id)"
                                class="absolute z-10 cursor-pointer top-0 right-4">
                                <i class="p-1 fa-solid fa-ellipsis-vertical"></i>
                            </div>
                        </div>
                    </div>



                    <div :id="task.id"
                        class="bg-white z-20 max-w-sm p-4 rounded-lg absolute right-4 top-10 hidden flex-col space-y-2 text-sm shadow-gray-400 shadow-lg">
                        <div @click="taskStore.editTask(task)"
                            class="flex items-center w-full space-x-2 p-2 justify-start cursor-pointer">
                            <i class="fa-regular fa-pen-to-square text-md"></i>
                            <p>Edit</p>
                        </div>
                        <div v-if="!task.isCompleted && !task.isArchived" @click="taskStore.archiveTask(task.id)"
                            class="flex items-center w-full space-x-2 p-2 justify-start cursor-pointer">
                            <i class="fa-solid fa-box-archive text-md"></i>
                            <p>Archive</p>
                        </div>
                        <div @click="taskStore.deleteTask(task.id)"
                            class="flex items-center w-full space-x-2 p-2 justify-start cursor-pointer">
                            <i class="fa-regular fa-trash-can text-md"></i>
                            <p>Delete</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else
            class="w-full h-[30rem] space-y-3 overflow-y-auto relative text-lg font-bold flex justify-center items-center">
            No {{ currentFilter }}
            Tasks
        </div>
        <ManageTask v-if="showModal" @close="toggleTaskModal" />
        <div id="toggleOptionsBg" class="w-full inset-0 top-0 bottom-0 absolute hidden backdrop-blur-0 "></div>
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
