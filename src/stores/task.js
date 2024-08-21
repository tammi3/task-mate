import {
  collection,
  addDoc,
  auth,
  setDoc,
  onSnapshot,
  query,
  where,
  getDocs,
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
    labels: [],
    priorities: [],
    taskName: "",
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
      });
    },
    async getTasks() {
      const q = query(collection(db, "tasks"), where("user_id", "==", this.user.uid), orderBy("start_date"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.tasks.push({
            id: doc.id,
            ...doc.data(),
          });
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    },
    taskCompleted(){}
  },
});
