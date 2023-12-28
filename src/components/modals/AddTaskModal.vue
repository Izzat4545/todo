<template>
  <div class="modal" :class="{ 'modal-open': showModal }">
    <div class="modal-box">
      <p class="py-4">Add task Modal</p>
      <form method="dialog">
        <button
          @click="toggleModal"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {},
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
