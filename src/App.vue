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
  <div class="bg-base-100/75 sticky z-10 top-0 mb-5 flex justify-center">
    <Header />
  </div>
  <List />
</template>
