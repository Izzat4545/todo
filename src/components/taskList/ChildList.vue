<script lang="ts">
import { textSlicer } from "../../utils/textSlicer";
import TaskInfoModal from "../modals/TaskInfoModal.vue";
import { Task } from "../../types/Tasks";
import { useTaskListStore } from "../../store/TaskListStore";
export default {
  data() {
    return {
      limit: 20,
      isModalOpen: false,
      taskListStore: useTaskListStore(),
    };
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    textSlicer(text: string): string {
      return textSlicer(text, this.limit);
    },
    deleteTask() {
      this.taskListStore.deleteTask(this.date, this.index);
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
    date: { type: String, required: true },
    index: { type: Number, required: true },
  },
  components: {
    TaskInfoModal,
  },
};
</script>
<template>
  <TaskInfoModal
    :date="date"
    :index="index"
    :selectedTask="tasks"
    :showModal="isModalOpen"
    :closeModal="toggleModal"
  />
  <li
    @click="toggleModal"
    class="btn my-2 btn-ghost h-full rounded-md hover:bg-transparent overflow-hidden p-0 w-full group"
  >
    <div
      class="transition-all bg-slate-800 group-hover:bg-slate-700 w-full flex pr-2 h-[70px] items-center justify-between"
    >
      <div class="flex gap-2 h-full justify-start items-center">
        <!-- IMPORTANCE -->
        <div
          class="h-full px-2"
          :class="getPriorityClass(tasks.priority)"
        ></div>
        <!-- TASK -->
        <div
          class="text-[18px] sm:text-[20px] transition-all relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bottom-1/3 after:left-0 after:bg-slate-500 after:transition-all after:duration-500 origin-bottom-right after:origin-bottom-left"
          :class="
            tasks.isFinished
              ? 'text-slate-500 after:scale-x-100'
              : 'text-slate-300 after:scale-x-0'
          "
        >
          {{ textSlicer(tasks.title) }}
        </div>
      </div>
      <button
        @click.stop="deleteTask"
        class="btn btn-ghost btn-circle text-white"
      >
        <span class="material-symbols-outlined text-red-400"> delete </span>
      </button>
    </div>
  </li>
</template>
