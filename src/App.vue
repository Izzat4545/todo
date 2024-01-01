<script lang="ts">
import List from "./components/taskList/ParentList.vue";
import Header from "./components/Header.vue";
import { useTaskListStore } from "./store/TaskListStore";

export default {
  data() {
    return {
      taskListStore: useTaskListStore(),
    };
  },
  async mounted() {
    await this.taskListStore.fetchTasks();
  },
  components: {
    List,
    Header,
  },
};
</script>

<template>
  <Header />
  <List />
</template>
