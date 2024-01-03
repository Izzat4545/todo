import { defineStore } from "pinia";
import { Task, MyData } from "../types/Tasks";
import { postData, readData } from "../utils/firebaseUtils/FirebaseCrud";
import { getCurrentDate } from "../utils/getCurrentDate";
import ReverseTasks from "../utils/reverseTasks";

export const useTaskListStore = defineStore("tasks", {
  state: () => ({
    isLoading: true,
    addTaskModal: false,
    tasksFromServer: {} as MyData,
    tasksFromState: {} as MyData,
  }),

  actions: {
    async fetchTasks() {
      this.tasksFromServer = (await readData("tasks")) || {};
      this.tasksFromServer = ReverseTasks(this.tasksFromServer);
      this.tasksFromState = JSON.parse(JSON.stringify(this.tasksFromServer));
      this.isLoading = false;
    },
    postTasks(data: Task) {
      const currentDate = getCurrentDate();
      if (this.tasksFromServer[currentDate]) {
        // Date exists, push data into the existing array
        this.tasksFromServer[currentDate].push(data);
        this.tasksFromState[currentDate].push(data);
      } else {
        this.tasksFromServer[currentDate] = [{ ...data }];
        this.tasksFromState[currentDate] = [{ ...data }];
      }
      postData(this.tasksFromServer);
    },
    deleteTask(date: string, taskIndex: number) {
      this.tasksFromServer[date].splice(taskIndex, 1);
      this.tasksFromState[date].splice(taskIndex, 1);
      if (this.tasksFromServer[date].length === 0) {
        // If no tasks are left, remove the date
        delete this.tasksFromServer[date];
        delete this.tasksFromState[date];
      }
      postData(this.tasksFromServer);
    },
    updateTask(date: string, taskIndex: number, updatedData: Task) {
      this.tasksFromServer[date][taskIndex] = updatedData;
      this.tasksFromState[date][taskIndex] = updatedData;

      postData(this.tasksFromServer);
    },
    toggleAddTaskModal() {
      this.addTaskModal = !this.addTaskModal;
    },
  },
});
