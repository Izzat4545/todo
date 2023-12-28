<script lang="ts">
import AddTaskModal from "./modals/AddTaskModal.vue";
export default {
  data() {
    return {
      openModal: false,
    };
  },
  methods: {
    toggleModal() {
      this.openModal = !this.openModal;
    },
  },
  components: {
    AddTaskModal,
  },
};
</script>
<template>
  <AddTaskModal :showModal="openModal" :closeModal="toggleModal" />
  <div class="bg-white py-4">
    <div
      class="w-[50%] m-auto text-slate-500 text-[20px] flex items-center justify-between font-bold"
    >
      <div>Tasks</div>
      <button @click="toggleModal" class="btn btn-ghost btn-circle">
        <span class="material-symbols-outlined"> add </span>
      </button>
    </div>
  </div>
</template>
