<script lang="ts">
import { useTaskListStore } from "../store/TaskListStore";
import { logOutUser } from "../utils/firebaseUtils/FirebaseAuth";
import AddTaskModal from "./modals/AddTaskModal.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";
export default {
  data() {
    return {
      taskListStore: useTaskListStore(),
    };
  },
  components: {
    AddTaskModal,
    ThemeSwitcher,
  },
  methods: {
    async logOut() {
      logOutUser();
      location.reload();
    },
  },
};
</script>
<template>
  <div
    class="w-[90%] backdrop-blur py-4 sm:w-[50%] lg:w-[30%] text-[20px] flex items-center justify-between font-bold"
  >
    <div>Tasks</div>
    <div class="flex items-center">
      <button
        data-toggle-theme="dark,light"
        data-act-class="ACTIVECLASS"
        class="btn btn-ghost btn-circle"
      >
        <ThemeSwitcher />
      </button>
      <button
        @click="() => taskListStore.toggleAddTaskModal()"
        class="btn btn-ghost btn-circle"
      >
        <span class="material-symbols-outlined"> add </span>
      </button>
      <button @click="logOut" class="btn btn-ghost btn-circle">
        <span class="material-symbols-outlined"> logout </span>
      </button>
    </div>
  </div>
  <AddTaskModal />
</template>
