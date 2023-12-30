<script lang="ts">
import { textSlicer } from "../../utils/textSlicer";
import TaskInfoModal from "../modals/TaskInfoModal.vue";
// import { SubtaskT } from "../../types/Tasks";
import { readDataOnce } from "../../utils/firebaseUtils/FirebaseCrud";
export default {
  data() {
    return {
      limit: 35,
      isModalOpen: false,
      data: "",
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
    async logData() {
      this.data = await readDataOnce();
    },
  },
  props: {
    tasks: { type: Object, required: true },
  },
  components: {
    TaskInfoModal,
  },
};
</script>
<template>
  <TaskInfoModal :showModal="isModalOpen" :closeModal="toggleModal" />
  <li
    @click="logData"
    class="btn btn-ghost h-full rounded-md hover:bg-transparent overflow-hidden p-0 w-full group"
  >
    <div
      class="bg-white transition-all group-hover:bg-slate-50 w-full flex pr-2 h-[70px] items-center justify-between"
    >
      <div class="flex gap-2 h-full justify-start items-center">
        <!-- IMPORTANCE -->
        <div class="bg-red-400 h-full px-2"></div>
        <!-- TASK -->
        <div class="text-[20px]">
          {{ data }}
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
