import {
  collection,
  addDoc,
  auth,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  getDocs,
  deleteDoc,
  orderBy,
  doc,
  db,
} from "@/db/firebase.js";
import Swal from "sweetalert2";
import { defineStore } from "pinia";

export const useTasksStore = defineStore("tasksStore", {
  // arrow function recommended for full type inference
  state: () => ({
    user: auth.currentUser,
    tasks: [],
    filters: [
      { icon: ["fa-solid", "fa-clock"], name: "Recent" },
      { icon: ["fa-solid", "fa-square-check"], name: "Completed" },
      { icon: ["fa-solid", "fa-box-archive"], name: "Archived" },
    ],
    sortedAndFilteredTasks: [],
    filteredTasks: [],
    labels: [],
    priorities: [],
    filterByPriority: "Any",
    filterByFolder: "All",
    sortBy: "Newest",
    taskName: "",
    currentFilter: "Recent",
    taskDescription: "",
    dueTime: "",
    dueDate: "",
    startTime: "",
    startDate: "",
    taskPrioprity: "",
    taskLabel: { name: "", color: "" },
    folderTasks: [],
  }),
  getters: {},
  actions: {
    getLabels() {
      const unsub = onSnapshot(doc(db, "categorizers", "labels"), (doc) => {
        this.labels = doc.data().labels;
      });
    },
    getPriorities() {
      const unsub = onSnapshot(doc(db, "categorizers", "priorities"), (doc) => {
        this.priorities = doc.data().priorities;
      });
    },
    setLabelColor() {
      const getLabelColor = this.labels.filter(
        (label) => label.name === this.taskLabel.name
      );
      this.taskLabel.color = getLabelColor[0].color;
    },
    resetManageTask() {
      this.taskName = "";
      this.taskDescription = "";
      this.dueTime = "";
      this.dueDate = "";
      this.startTime = "";
      this.startDate = "";
      this.taskPrioprity = "";
      this.taskLabel = { name: "", color: "" };
      this.resetSortAndFilter(this.currentFilter);
      this.sortAndFilterTasks(this.currentFilter);
    },
    async addTask() {
      this.setLabelColor();
      const docRef = await addDoc(collection(db, "tasks"), {
        name: this.taskName,
        description: this.taskDescription,
        start_time: this.startTime,
        start_date: this.startDate,
        due_time: this.dueTime,
        due_date: this.dueDate,
        priority: this.taskPrioprity,
        label: this.taskLabel,
        user_id: this.user.uid,
        isCompleted: false,
        isArchived: false,
        isDeadline: false,
      }).then(() => {
        this.resetManageTask();
      });
    },
    async getTasks(filter) {
      this.filteredTasks = [];
      this.sortedAndFilteredTasks = [];
      this.currentFilter = filter;

      const q = query(
        collection(db, "tasks"),
        where("user_id", "==", this.user.uid)
      );

      const querySnapshot = await getDocs(q);
      this.tasks = [];
      querySnapshot.forEach((doc) => {
        this.tasks.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    },
    resetSortAndFilter(filter) {
      this.currentFilter = filter;
      this.sortBy = "Newest";
      this.filterByPriority = "Any";
      this.filterByFolder = "All";
    },
    async sortAndFilterTasks(filter) {
      await this.getTasks(filter);

      const isCompleted = this.currentFilter === "Completed";
      const isArchived = this.currentFilter === "Archived";
      const sortOrder =
        this.sortBy === "Newest"
          ? "descending"
          : this.sortBy === "Oldest"
          ? "ascending"
          : this.sortBy;

      // Helper function to filter by completion and archived status
      const filterByStatus = () => {
        return this.tasks.filter((task) => {
          const isTaskCompleted = task.isCompleted === isCompleted;
          const isTaskArchived = task.isArchived === isArchived;
          return isTaskCompleted && isTaskArchived;
        });
      };

      // Helper function to filter by priority
      const filterByPriority = (tasks, priority) => {
        return priority !== "Any"
          ? tasks.filter((task) => task.priority === priority)
          : tasks;
      };
      // Helper function to filter by folder
      const filterByFolder = (tasks, folder) => {
        return folder !== "All"
          ? tasks.filter((task) => task.label.name === folder)
          : tasks;
      };

      // Apply filters
      const filteredStatus = filterByStatus();
      const filteredPriority = filterByPriority(
        filteredStatus,
        this.filterByPriority
      );
      const filteredFolder = filterByFolder(
        filteredPriority,
        this.filterByFolder
      );

      // Sort tasks based on sorting criteria
      if (sortOrder === "ascending" || sortOrder === "descending") {
        this.filteredTasks = filteredFolder;
        this.sortByStartDateAndTime(sortOrder);
      } else if (sortOrder === "A-Z" || sortOrder === "Z-A") {
        this.filteredTasks = filteredFolder;
        this.sortByAlphabet(sortOrder);
      }
    },
    sortByStartDateAndTime(order) {
      if (order == "ascending") {
        this.sortedAndFilteredTasks = this.filteredTasks.sort((a, b) => {
          const dateA = new Date(`${a.start_date}T${a.start_time}`);
          const dateB = new Date(`${b.start_date}T${b.start_time}`);
          return dateA - dateB;
        });
      } else {
        this.sortedAndFilteredTasks = this.filteredTasks.sort((a, b) => {
          const dateA = new Date(`${a.start_date}T${a.start_time}`);
          const dateB = new Date(`${b.start_date}T${b.start_time}`);
          return dateB - dateA;
        });
      }
    },
    sortByAlphabet(order) {
      if (order == "A-Z") {
        // Sort the filtered tasks alphabetically by name (A-Z)
        this.sortedAndFilteredTasks = this.filteredTasks.sort((a, b) => {
          // Compare the task names in a case-insensitive manner
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });
      } else {
        // Sort the filtered tasks alphabetically by name (Z-A)
        this.sortedAndFilteredTasks = this.filteredTasks.sort((a, b) => {
          // Compare the task names in a case-insensitive manner
          return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
        });
      }
    },
    taskCompleted(task) {
      if (task.isArchived) {
        updateDoc(doc(db, "tasks", task.id), {
          isCompleted: true,
          isArchived: false,
        });
      } else {
        updateDoc(doc(db, "tasks", task.id), {
          isCompleted: true,
        });
      }

      this.sortAndFilterTasks(this.currentFilter);
    },
    toggleOptions(id) {
      const moreOptions = document.getElementById(id);
      const toggleOptionsBg = document.getElementById("toggleOptionsBg");
      const ellipsis = document.getElementById(`${id}-ellipsis`);
      toggleOptionsBg.addEventListener("click", function () {
        toggleOptionsBg.classList.add("hidden");
        moreOptions.classList.remove("flex");
        moreOptions.classList.add("hidden");
      });
      if (moreOptions.classList.contains("hidden")) {
        toggleOptionsBg.classList.remove("hidden");
        moreOptions.classList.add("flex");
        ellipsis.classList.add("z-10");
        moreOptions.classList.remove("hidden");
      } else {
        toggleOptionsBg.classList.add("hidden");
        moreOptions.classList.remove("flex");
        ellipsis.classList.remove("z-10");
        moreOptions.classList.add("hidden");
      }
    },
    editTask(task) {},
    async deleteTask(id) {
      this.toggleOptions(id);
      await deleteDoc(doc(db, "tasks", id));
    },
    archiveTask(id) {
      updateDoc(doc(db, "tasks", id), {
        isArchived: true,
      });
    },
    async checkAndArchiveTasks() {
      const now = new Date();

      try {
        const q = query(
          collection(db, "tasks"),
          where("user_id", "==", this.user.uid)
        );

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((docTask) => {
          const task = docTask.data();
          const deadline = new Date(`${task.due_date}T${task.due_time}`);

          // Check if the deadline has passed
          if (deadline < now && task.isCompleted === false) {
            // Update the isArchived field to true
            updateDoc(doc(db, "tasks", docTask.id), {
              isArchived: true,
            });
          }
        });
      } catch (error) {
        // console.error("Error getting tasks: ", error);
      }
    },
    daysUntilDeadline(deadlineDate) {
      const currentDate = new Date();
      const deadline = new Date(deadlineDate);

      // Calculate the difference in time (in milliseconds)
      const differenceInTime = deadline - currentDate;

      // Convert time difference from milliseconds to days
      const differenceInDays = Math.ceil(
        differenceInTime / (1000 * 60 * 60 * 24)
      );

      return differenceInDays;
    },
    getFolderTasks(label) {
      this.getTasks("Recent");
    },
  },
});
