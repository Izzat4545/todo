<script lang="ts">
import { useTaskListStore } from "../store/TaskListStore";
import AddTaskModal from "./modals/AddTaskModal.vue";
export default {
  data() {
    return {
      taskListStore: useTaskListStore(),
    };
  },
  components: {
    AddTaskModal,
  },
};
</script>
<template>
  <div
    class="w-[90%] backdrop-blur py-4 sm:w-[50%] lg:w-[30%] text-[20px] flex items-center justify-between font-bold"
  >
    <div>Tasks</div>
    <button
      @click="() => taskListStore.toggleAddTaskModal()"
      class="btn btn-ghost btn-circle"
    >
      <span class="material-symbols-outlined"> add </span>
    </button>
  </div>
  <AddTaskModal />
</template>
