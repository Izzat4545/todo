<template>
  <div class="modal" :class="{ 'modal-open': showModal }">
    <div class="modal-box">
      <form method="dialog">
        <button
          @click="toggleModal"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
      </form>

      <p class="py-4">Add task Modal</p>
    </div>
  </div>
</template>

<script lang="ts">
// import { postData } from "../../utils/firebaseUtils/FirebaseCrud";
export default {
  data() {
    return {
      // data: {
      //   "12282023": [
      //     {
      //       task: "Do the dishes",
      //       subtask: ["Clean the house"],
      //       priority: "important",
      //     },
      //     {
      //       task: "Fix the motorbike",
      //       subtask: ["Clean it after finishing", "Change Oil"],
      //       priority: "optional",
      //     },
      //   ],
      //   "12292023": [
      //     {
      //       task: "Do the dishes",
      //       subtask: ["Clean the house"],
      //       priority: "important",
      //     },
      //     {
      //       task: "Fix the motorbike",
      //       subtask: ["Clean it after finishing", "Change Oil"],
      //       priority: "optional",
      //     },
      //   ],
      //   "12302023": [
      //     {
      //       task: "Do the dishes",
      //       subtask: ["Clean the house"],
      //       priority: "important",
      //     },
      //     {
      //       task: "Fix the motorbike",
      //       subtask: ["Clean it after finishing", "Change Oil"],
      //       priority: "optional",
      //     },
      //   ],
      // },
    };
  },
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    closeModal: {
      type: Function,
      required: true,
    },
  },
  methods: {
    toggleModal() {
      this.closeModal();
    },
  },
};
</script>
