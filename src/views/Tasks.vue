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
  labels,
  folder,
  filteredTasks,
  sortBy,
  filterByPriority,
} = storeToRefs(taskStore);
const showModal = ref(false);

watch(currentFilter, (newcurrentFilter, oldcurrentFilter) => {
  if (oldcurrentFilter !== newcurrentFilter) {
    taskStore.resetSortAndFilter(newcurrentFilter);
  }
});
function toggleTaskModal() {
  if (showModal.value === true) {
    taskStore.resetManageTask();
  }
  showModal.value = !showModal.value;
}
function loading() {
  const loadingIndicator = document.getElementById("loading-indicator");
  const noTasks = document.getElementById("no-tasks");
  if (noTasks.classList.contains("hidden")) {
    // Show loading indicator and hide noTasks
    loadingIndicator.classList.remove("hidden");
    noTasks.classList.add("hidden");

    // After 2 seconds, hide loading indicator and show noTasks
    setTimeout(() => {
      loadingIndicator.classList.add("hidden");
      noTasks.classList.remove("hidden");
    }, 2000);
  } else {
    // Show loading indicator and hide noTasks
    noTasks.classList.add("hidden");
    loadingIndicator.classList.remove("hidden");

    // After 2 seconds, hide loading indicator and show noTasks
    setTimeout(() => {
      noTasks.classList.remove("hidden");
      loadingIndicator.classList.add("hidden");
    }, 2000);
  }
}

async function getSortAndFilterTasks(filter) {
  await taskStore.sortAndFilterTasks(filter);
  loading();
}
onMounted(async () => {
  taskStore.getPriorities();
  taskStore.getLabels();
  await getSortAndFilterTasks(currentFilter.value);
});
</script>
<template>
  <div
    class="w-full lg:container bg-white rounded-lg p-4 lg:p-6 flex flex-col space-y-10 overflow-x-auto"
  >
    <div class="flex flex-col space-y-2">
      <div
        class="bg-gray-100 w-full flex space-x-2 justify-around p-2 rounded-lg text-md font-semibold"
      >
        <!-- task filter navigator for large screens -->
        <button
          class="hidden lg:block"
          v-for="filter in filters"
          :key="filter"
          @click="getSortAndFilterTasks(filter.name)"
          :class="[
            'flex',
            'justify-center',
            'items-center',
            'p-2',
            'w-1/4',
            'space-x-2',
            currentFilter === filter.name
              ? ['border-2', 'border-gray-700', 'rounded-md', 'flex']
              : '',
          ]"
        >
          <i :class="filter.icon"></i><span>{{ filter.name }}</span>
        </button>
        <!-- task filter navigator for small screens -->
        <div class="w-2/4 lg:hidden relative">
          <label
            class="absolute inset-0 w-full flex justify-center items-center space-x-2 border-2 border-gray-700 rounded-md"
            for="filterSelect"
          >
            <span>{{ currentFilter }}</span
            ><i class="fa-solid text-lg fa-caret-down"></i
          ></label>
          <select
            v-model="currentFilter"
            @change="getSortAndFilterTasks(currentFilter)"
            class="w-full opacity-0"
            name="filter"
            id="filterSelect"
          >
            <option
              v-for="filter in filters"
              :key="filter"
              :value="filter.name"
            >
              {{ filter.name }}
            </option>
          </select>
        </div>
        <!-- toggle add task modal -->
        <button
          @click="toggleTaskModal"
          class="flex justify-center items-center p-2 space-x-2 w-2/4 lg:w-1/4"
        >
          <i class="fa-solid fa-box-archive"></i><span>Add Task</span>
        </button>
      </div>
      <div class="max-w-md flex space-x-4 overflow-x-auto">
        <div class="flex-col flex space-y-2 w-1/3">
          <label for="sort">Sort by</label>
          <select
            id="sort"
            v-model="sortBy"
            @change="getSortAndFilterTasks(currentFilter)"
            class="block appearance-none rounded-md bg-white border border-gray-300 hover:border-gray-500 p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option selected>Newest</option>
            <option>Oldest</option>
            <option>A-Z</option>
            <option>Z-A</option>
          </select>
        </div>
        <div class="flex-col flex space-y-2 w-1/3">
          <label for="priority">Priority</label>
          <select
            id="priority"
            v-model="filterByPriority"
            @change="getSortAndFilterTasks(currentFilter)"
            class="block appearance-none rounded-md bg-white border border-gray-300 hover:border-gray-500 p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option selected>Any</option>
            <option v-for="priority in priorities" :key="priority">
              {{ priority }}
            </option>
          </select>
        </div>
        <div class="flex-col flex space-y-2 w-1/3">
          <label for="sort">Folder</label>
          <select
            id="sort"
            v-model="folder"
            class="block appearance-none rounded-md bg-white border border-gray-300 hover:border-gray-500 p-2 shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <!-- <option selected>Newest</option> -->
            <option v-for="label in labels" :key="label" :value="label.name">
              {{ label.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div
      v-if="sortedAndFilteredTasks.length === 0"
      class="w-full h-[30rem] space-y-3 overflow-y-auto relative text-lg font-bold flex justify-center items-center lg:w-[90rem]"
    >
      <div id="loading-indicator" class="animate-spin">
        <i class="fa-solid fa-hourglass-start text-2xl"></i>
      </div>
      <p id="no-tasks" class="hidden">No {{ currentFilter }} Tasks</p>
    </div>
    <div
      v-else
      class="w-full flex flex-col h-[30rem] space-y-3 overflow-y-auto overflow-x-auto"
    >
      <div
        v-for="(task, index) in sortedAndFilteredTasks"
        :key="task"
        class="w-full bg-gray-200 px-2 py-4 flex items-center rounded-lg relative lg:w-[90rem]"
      >
        <label
          @click="taskStore.taskCompleted(task)"
          v-if="!task.isCompleted"
          class="checkbox flex items-start"
        >
          <input type="checkbox" />
          <span class="checkmark"></span>
        </label>
        <div class="flex space-x-2 lg:space-x-4 w-full">
          <div class="w-3/4 lg:w-2/4 flex space-x-2 px-2">
            <router-link
              :to="`/Dashboard/Task/${index}`"
              class="w-3/4 truncate hover:underline"
              >{{ task.name }}</router-link
            >
            <div
              class="flex space-x-2 pl-2 items-center justify-start w-1/4 font-medium"
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

          <div
            :class="[
              'hidden',
              'lg:flex',
              'space-x-2',
              'items-center',
              currentFilter === 'Completed'
                ? ['w-2/4', 'justify-end', 'pr-10']
                : 'w-1/4',
            ]"
          >
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
          <div
            :class="[
              'w-1/4',
              'lg:relative',
              currentFilter === 'Completed' ? ['hidden'] : '',
            ]"
          >
            <div
              v-if="!task.isCompleted && !task.isArchived"
              class="hidden lg:flex space-x-2 w-3/4 items-center"
            >
              {{
                taskStore.daysUntilDeadline(`${task.due_date}T${task.due_time}`)
              }}
              day(s) till deadline.
            </div>
            <div
              v-if="!task.isCompleted && task.isArchived"
              class="hidden lg:flex space-x-2 w-3/4 items-center"
            >
              Deadline was
              {{
                `${taskStore.daysUntilDeadline(
                  `${task.due_date}T${task.due_time}`
                )}`.slice(1, 2)
              }}
              day(s) ago.
            </div>
            <div class="w-full lg:w-1/4">
              <div
                :id="`${task.id}-ellipsis`"
                v-if="!task.isCompleted"
                @click="taskStore.toggleOptions(task.id)"
                class="flex justify-end absolute cursor-pointer top-3 lg:top-0 right-4"
              >
                <i class="p-1 fa-solid fa-ellipsis-vertical"></i>
              </div>
            </div>
          </div>

          <div
            :id="task.id"
            class="bg-white z-20 max-w-sm p-4 rounded-lg absolute right-4 top-10 hidden flex-col space-y-2 text-sm shadow-gray-400 shadow-lg"
          >
            <div
              @click="taskStore.editTask(task)"
              class="flex items-center w-full space-x-2 p-2 justify-start cursor-pointer"
            >
              <i class="fa-regular fa-pen-to-square text-md"></i>
              <p>Edit</p>
            </div>
            <div
              @click="taskStore.deleteTask(task.id)"
              class="flex items-center w-full space-x-2 p-2 justify-start cursor-pointer"
            >
              <i class="fa-regular fa-trash-can text-md"></i>
              <p>Delete</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ManageTask v-if="showModal" @close="toggleTaskModal" />
    <div
      id="toggleOptionsBg"
      class="w-full inset-0 top-0 bottom-0 absolute hidden backdrop-blur-0"
    ></div>
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
.checkbox:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.checkbox input:checked ~ .checkmark {
  background-color: #000000;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox input:checked ~ .checkmark:after {
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
