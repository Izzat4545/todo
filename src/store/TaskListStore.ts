import { defineStore } from "pinia";
import { Task, MyData } from "../types/Tasks";
import { postData, readData } from "../utils/firebaseUtils/FirebaseCrud";

export const useTaskListStore = defineStore("tasks", {
  state: () => ({
    isLoading: true,
    isPosting: true,
    tasksFromServer: {} as MyData | undefined,
    tasksFromState: {} as MyData | undefined,
  }),
  actions: {
    async fetchTasks() {
      this.tasksFromServer = await readData("tasks");
      this.tasksFromState = JSON.parse(JSON.stringify(this.tasksFromServer));
      this.isLoading = false;
    },
    postTasks(data: Task) {
      postData([data]);
      this.isPosting = false;
    },
  },
});
