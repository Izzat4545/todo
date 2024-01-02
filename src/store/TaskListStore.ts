import { defineStore } from "pinia";
import { Task, MyData } from "../types/Tasks";
import { postData, readData } from "../utils/firebaseUtils/FirebaseCrud";
import { getCurrentDate } from "../utils/getCurrentDate";

export const useTaskListStore = defineStore("tasks", {
  state: () => ({
    isLoading: true,
    tasksFromServer: {} as MyData,
    tasksFromState: {} as MyData,
  }),
  actions: {
    async fetchTasks() {
      this.tasksFromServer = (await readData("tasks")) || {};
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
  },
});
