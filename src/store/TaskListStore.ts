import { defineStore } from "pinia";
import { MyData } from "../types/Tasks";
import { readData } from "../utils/firebaseUtils/FirebaseCrud";

export const useTaskListStore = defineStore("tasks", {
  state: () => ({
    isLoading: false,
    tasksFromServer: {} as MyData | undefined,
    tasksFromState: {} as MyData | undefined,
  }),
  actions: {
    async fetchData() {
      this.isLoading = true;
      this.tasksFromServer = await readData("tasks");
      this.tasksFromState = JSON.parse(JSON.stringify(this.tasksFromServer));
      this.isLoading = false;
    },
  },
});
