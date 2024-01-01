<script lang="ts">
import { textSlicer } from "../../utils/textSlicer";
import TaskInfoModal from "../modals/TaskInfoModal.vue";
import { Task } from "../../types/Tasks";
export default {
  data() {
    return {
      limit: 35,
      isModalOpen: false,
    };
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    textSlicer(text: string): string {
      return textSlicer(text, this.limit);
    },
    childFunction() {
      console.log("child function");
    },
    getPriorityClass(priority: string) {
      switch (priority) {
        case "important":
          return "bg-red-400";
        case "medium":
          return "bg-yellow-400";
        case "optional":
          return "bg-green-400";
        default:
          return "bg-slate-300";
      }
    },
  },
  props: {
    tasks: { type: Object as () => Task, required: true },
  },
  components: {
    TaskInfoModal,
  },
};
</script>
<template>
  <TaskInfoModal :showModal="isModalOpen" :closeModal="toggleModal" />
  <li
    class="btn my-2 btn-ghost h-full rounded-md hover:bg-transparent overflow-hidden p-0 w-full group"
  >
    <div
      class="bg-white transition-all group-hover:bg-slate-100 w-full flex pr-2 h-[70px] items-center justify-between"
    >
      <div class="flex gap-2 h-full justify-start items-center">
        <!-- IMPORTANCE -->
        <div
          class="h-full px-2"
          :class="getPriorityClass(tasks.priority)"
        ></div>
        <!-- TASK -->
        <div
          class="text-[20px]"
          :class="
            tasks.isFinished ? 'line-through text-slate-300' : 'text-black'
          "
        >
          {{ tasks.title }}
        </div>
      </div>
      <button
        @click.stop="childFunction"
        class="btn btn-ghost btn-circle text-white"
      >
        <span class="material-symbols-outlined text-red-400"> delete </span>
      </button>
    </div>
  </li>
</template>
