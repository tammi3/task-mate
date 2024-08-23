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
export const useTasksStore = defineStore("tasks", {
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
    sortBy: "Newest",
    taskName: "",
    currentFilter: "Recent",
    taskDescription: "",
    dueTime: "",
    dueDate: "",
    startTime: "",
    startDate: "",
    taskPrioprity: "",
    taskLabel: "",
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
    async addTask() {
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
        this.taskName = "";
        this.taskDescription = "";
        this.dueTime = "";
        this.dueDate = "";
        this.startTime = "";
        this.startDate = "";
        this.taskPrioprity = "";
        this.taskLabel = "";
        this.sortandFilterTasks(this.currentFilter);
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
    resetSortandFilter(filter) {
      this.currentFilter = filter;
      this.sortBy = "Newest";
      this.filterByPriority = "Any";
    },
    sortAndFilterTasks(filter) {
      this.getTasks(filter);
      // filter and sort tasks in recent
      if (this.currentFilter == "Recent") {
        if (this.sortBy == "Newest" && this.filterByPriority == "Any") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === false
          );
          this.filteredTasks = filterByCompleted;
          this.sortByStartDateAndTime("descending");
        }
        if (this.sortBy == "Newest" && this.filterByPriority == "Low") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === false
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "Low"
          );
          this.filteredTasks = filterByPriority;
          this.sortByStartDateAndTime("descending");
        }
        if (this.sortBy == "Newest" && this.filterByPriority == "Medium") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === false
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "Medium"
          );
          this.filteredTasks = filterByPriority;
          this.sortByStartDateAndTime("descending");
        }
        if (this.sortBy == "Newest" && this.filterByPriority == "High") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === false
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "High"
          );
          this.filteredTasks = filterByPriority;
          this.sortByStartDateAndTime("descending");
        }
        if (this.sortBy == "Oldest" && this.filterByPriority == "Any") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === false
          );
          this.filteredTasks = filterByCompleted;
          this.sortByStartDateAndTime("ascending");
        }
        if (this.sortBy == "Oldest" && this.filterByPriority == "Low") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === false
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "Low"
          );
          this.filteredTasks = filterByPriority;
          this.sortByStartDateAndTime("ascending");
        }
        if (this.sortBy == "Oldest" && this.filterByPriority == "Medium") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === false
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "Medium"
          );
          this.filteredTasks = filterByPriority;
          this.sortByStartDateAndTime("ascending");
        }
        if (this.sortBy == "Oldest" && this.filterByPriority == "High") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === false
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "High"
          );
          this.filteredTasks = filterByPriority;
          this.sortByStartDateAndTime("ascending");
        }
        if (this.sortBy == "A-Z" && this.filterByPriority == "Any") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === false
          );
          this.filteredTasks = filterByCompleted;
          this.sortByAlphabet("A-Z");
        }
        if (this.sortBy == "A-Z" && this.filterByPriority == "Low") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === false
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "Low"
          );
          this.filteredTasks = filterByPriority;
          this.sortByAlphabet("A-Z");
        }
        if (this.sortBy == "A-Z" && this.filterByPriority == "Medium") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === false
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "Medium"
          );
          this.filteredTasks = filterByPriority;
          this.sortByAlphabet("A-Z");
        }
        if (this.sortBy == "A-Z" && this.filterByPriority == "High") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === false
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "High"
          );
          this.filteredTasks = filterByPriority;
          this.sortByAlphabet("A-Z");
        }

        if (this.sortBy == "Z-A" && this.filterByPriority == "Any") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === false
          );
          this.filteredTasks = filterByCompleted;
          this.sortByAlphabet("Z-A");

          if (this.sortBy == "Z-A" && this.filterByPriority == "Low") {
            const filterByCompleted = this.tasks.filter(
              (task) => task.isCompleted === false && task.isArchived === false
            );
            const filterByPriority = filterByCompleted.filter(
              (task) => task.priority === "Low"
            );
            this.filteredTasks = filterByPriority;
            this.sortByAlphabet("Z-A");
          }
          if (this.sortBy == "Z-A" && this.filterByPriority == "Medium") {
            const filterByCompleted = this.tasks.filter(
              (task) => task.isCompleted === false && task.isArchived === false
            );
            const filterByPriority = filterByCompleted.filter(
              (task) => task.priority === "Medium"
            );
            this.filteredTasks = filterByPriority;
            this.sortByAlphabet("Z-A");
          }
          if (this.sortBy == "Z-A" && this.filterByPriority == "High") {
            const filterByCompleted = this.tasks.filter(
              (task) => task.isCompleted === false && task.isArchived === false
            );
            const filterByPriority = filterByCompleted.filter(
              (task) => task.priority === "High"
            );
            this.filteredTasks = filterByPriority;
            this.sortByAlphabet("Z-A");
          }
        }
      }

      // filter and sort tasks in completed

      if (this.currentFilter == "Completed") {
        if (this.sortBy == "Newest" && this.filterByPriority == "Any") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === true && task.isArchived === false
          );
          this.filteredTasks = filterByCompleted;
          this.sortByStartDateAndTime("descending");
        }
        if (this.sortBy == "Newest" && this.filterByPriority == "Low") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === true && task.isArchived === false
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "Low"
          );
          this.filteredTasks = filterByPriority;
          this.sortByStartDateAndTime("descending");
        }
        if (this.sortBy == "Newest" && this.filterByPriority == "Medium") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === true && task.isArchived === false
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "Medium"
          );
          this.filteredTasks = filterByPriority;
          this.sortByStartDateAndTime("descending");
        }
        if (this.sortBy == "Newest" && this.filterByPriority == "High") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === true && task.isArchived === false
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "High"
          );
          this.filteredTasks = filterByPriority;
          this.sortByStartDateAndTime("descending");
        }
        if (this.sortBy == "Oldest" && this.filterByPriority == "Any") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === true && task.isArchived === false
          );
          this.filteredTasks = filterByCompleted;
          this.sortByStartDateAndTime("ascending");
        }
        if (this.sortBy == "Oldest" && this.filterByPriority == "Low") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === true && task.isArchived === false
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "Low"
          );
          this.filteredTasks = filterByPriority;
          this.sortByStartDateAndTime("ascending");
        }
        if (this.sortBy == "Oldest" && this.filterByPriority == "Medium") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === true && task.isArchived === false
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "Medium"
          );
          this.filteredTasks = filterByPriority;
          this.sortByStartDateAndTime("ascending");
        }
        if (this.sortBy == "Oldest" && this.filterByPriority == "High") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === true && task.isArchived === false
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "High"
          );
          this.filteredTasks = filterByPriority;
          this.sortByStartDateAndTime("ascending");
        }

        if (this.sortBy == "A-Z" && this.filterByPriority == "Any") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === true && task.isArchived === false
          );
          this.filteredTasks = filterByCompleted;
          this.sortByAlphabet("A-Z");
        }
        if (this.sortBy == "A-Z" && this.filterByPriority == "Low") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === true && task.isArchived === false
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "Low"
          );
          this.filteredTasks = filterByPriority;
          this.sortByAlphabet("A-Z");
        }
        if (this.sortBy == "A-Z" && this.filterByPriority == "Medium") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === true && task.isArchived === false
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "Medium"
          );
          this.filteredTasks = filterByPriority;
          this.sortByAlphabet("A-Z");
        }
        if (this.sortBy == "A-Z" && this.filterByPriority == "High") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === true && task.isArchived === false
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "High"
          );
          this.filteredTasks = filterByPriority;
          this.sortByAlphabet("A-Z");
        }

        if (this.sortBy == "Z-A" && this.filterByPriority == "Any") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === true && task.isArchived === false
          );
          this.filteredTasks = filterByCompleted;
          this.sortByAlphabet("Z-A");

          if (this.sortBy == "Z-A" && this.filterByPriority == "Low") {
            const filterByCompleted = this.tasks.filter(
              (task) => task.isCompleted === true && task.isArchived === false
            );
            const filterByPriority = filterByCompleted.filter(
              (task) => task.priority === "Low"
            );
            this.filteredTasks = filterByPriority;
            this.sortByAlphabet("Z-A");
          }
          if (this.sortBy == "Z-A" && this.filterByPriority == "Medium") {
            const filterByCompleted = this.tasks.filter(
              (task) => task.isCompleted === true && task.isArchived === false
            );
            const filterByPriority = filterByCompleted.filter(
              (task) => task.priority === "Medium"
            );
            this.filteredTasks = filterByPriority;
            this.sortByAlphabet("Z-A");
          }
          if (this.sortBy == "Z-A" && this.filterByPriority == "High") {
            const filterByCompleted = this.tasks.filter(
              (task) => task.isCompleted === true && task.isArchived === false
            );
            const filterByPriority = filterByCompleted.filter(
              (task) => task.priority === "High"
            );
            this.filteredTasks = filterByPriority;
            this.sortByAlphabet("Z-A");
          }
        }
      }
      // filter and sort tasks in archived
      if (this.currentFilter == "Archived") {
        if (this.sortBy == "Newest" && this.filterByPriority == "Any") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === true
          );
          this.filteredTasks = filterByCompleted;
          this.sortByStartDateAndTime("descending");
        }
        if (this.sortBy == "Newest" && this.filterByPriority == "Low") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === true
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "Low"
          );
          this.filteredTasks = filterByPriority;
          this.sortByStartDateAndTime("descending");
        }
        if (this.sortBy == "Newest" && this.filterByPriority == "Medium") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === true
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "Medium"
          );
          this.filteredTasks = filterByPriority;
          this.sortByStartDateAndTime("descending");
        }
        if (this.sortBy == "Newest" && this.filterByPriority == "High") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === true
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "High"
          );
          this.filteredTasks = filterByPriority;
          this.sortByStartDateAndTime("descending");
        }
        if (this.sortBy == "Oldest" && this.filterByPriority == "Any") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === true
          );
          this.filteredTasks = filterByCompleted;
          this.sortByStartDateAndTime("ascending");
        }
        if (this.sortBy == "Oldest" && this.filterByPriority == "Low") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === true
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "Low"
          );
          this.filteredTasks = filterByPriority;
          this.sortByStartDateAndTime("ascending");
        }
        if (this.sortBy == "Oldest" && this.filterByPriority == "Medium") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === true
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "Medium"
          );
          this.filteredTasks = filterByPriority;
          this.sortByStartDateAndTime("ascending");
        }
        if (this.sortBy == "Oldest" && this.filterByPriority == "High") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === true
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "High"
          );
          this.filteredTasks = filterByPriority;
          this.sortByStartDateAndTime("ascending");
        }

        if (this.sortBy == "A-Z" && this.filterByPriority == "Any") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === true
          );
          this.filteredTasks = filterByCompleted;
          this.sortByAlphabet("A-Z");
        }
        if (this.sortBy == "A-Z" && this.filterByPriority == "Low") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === true
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "Low"
          );
          this.filteredTasks = filterByPriority;
          this.sortByAlphabet("A-Z");
        }
        if (this.sortBy == "A-Z" && this.filterByPriority == "Medium") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === true
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "Medium"
          );
          this.filteredTasks = filterByPriority;
          this.sortByAlphabet("A-Z");
        }
        if (this.sortBy == "A-Z" && this.filterByPriority == "High") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === true
          );
          const filterByPriority = filterByCompleted.filter(
            (task) => task.priority === "High"
          );
          this.filteredTasks = filterByPriority;
          this.sortByAlphabet("A-Z");
        }

        if (this.sortBy == "Z-A" && this.filterByPriority == "Any") {
          const filterByCompleted = this.tasks.filter(
            (task) => task.isCompleted === false && task.isArchived === true
          );
          this.filteredTasks = filterByCompleted;
          this.sortByAlphabet("Z-A");

          if (this.sortBy == "Z-A" && this.filterByPriority == "Low") {
            const filterByCompleted = this.tasks.filter(
              (task) => task.isCompleted === false && task.isArchived === true
            );
            const filterByPriority = filterByCompleted.filter(
              (task) => task.priority === "Low"
            );
            this.filteredTasks = filterByPriority;
            this.sortByAlphabet("Z-A");
          }
          if (this.sortBy == "Z-A" && this.filterByPriority == "Medium") {
            const filterByCompleted = this.tasks.filter(
              (task) => task.isCompleted === false && task.isArchived === true
            );
            const filterByPriority = filterByCompleted.filter(
              (task) => task.priority === "Medium"
            );
            this.filteredTasks = filterByPriority;
            this.sortByAlphabet("Z-A");
          }
          if (this.sortBy == "Z-A" && this.filterByPriority == "High") {
            const filterByCompleted = this.tasks.filter(
              (task) => task.isCompleted === false && task.isArchived === true
            );
            const filterByPriority = filterByCompleted.filter(
              (task) => task.priority === "High"
            );
            this.filteredTasks = filterByPriority;
            this.sortByAlphabet("Z-A");
          }
        }
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
      updateDoc(doc(db, "tasks", task.id), {
        isCompleted: true,
      });

      this.sortAndFilterTasks(this.currentFilter);
    },
    toggleOptions(id) {
      const moreOptions = document.getElementById(id);
      console.log(id);
      if (moreOptions.classList.contains("hidden")) {
        moreOptions.classList.add("flex");
        moreOptions.classList.remove("hidden");
      } else {
        moreOptions.classList.remove("flex");
        moreOptions.classList.add("hidden");
      }
    },
    editTask(task) {},
    async deleteTask(id) {
      await deleteDoc(doc(db, "tasks", id));
    },
    archiveTask(id) {
      updateDoc(doc(db, "tasks", id), {
        isArchived: true,
      });
    },
  },
});
