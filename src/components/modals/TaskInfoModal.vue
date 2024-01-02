<script lang="ts">
import { useTaskListStore } from "../../store/TaskListStore";
import { Task } from "../../types/Tasks";
export default {
  data() {
    return {
      error: "",
      taskListStore: useTaskListStore(),

      form: {
        title: this.selectedTask.title,
        priority: this.selectedTask.priority,
        description: this.selectedTask.description,
        isFinished: this.selectedTask.isFinished,
      },
    };
  },
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    selectedTask: {
      type: Object as () => Task,
      required: true,
    },
    closeModal: {
      type: Function,
      required: true,
    },
    date: { type: String, required: true },
    index: { type: Number, required: true },
  },
  methods: {
    priorityController(selectedBtn: string) {
      this.form.priority = selectedBtn;
    },
    async submit() {
      if (this.form.priority && this.form.title.length > 0) {
        this.$emit("submit", this.form);
        this.taskListStore.updateTask(this.date, this.index, this.form);

        this.exitModal();
      } else {
        this.error = "Please fill all the fields";
      }
    },

    async completeTask() {
      this.form.isFinished = !this.form.isFinished;
      await this.submit();
      this.exitModal();
    },

    exitModal() {
      this.closeModal();
      this.error = "";
    },
  },
};
</script>

<template>
  <div class="modal" :class="{ 'modal-open': showModal }">
    <div class="modal-box">
      <form method="dialog">
        <button
          type="submit"
          @click="submit"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
      </form>
      <p class="pb-4 text-[20px] text-center">Task</p>
      <form
        method="dialog"
        @submit.prevent="submit"
        class="flex flex-col justify-center gap-2"
      >
        <input
          class="input input-ghost rounded-md"
          type="text"
          placeholder="Title"
          v-model="form.title"
        />
        <div class="tabs">
          <button
            type="button"
            @click="priorityController('important')"
            role="tab"
            class="tab rounded-lg h-full transition-all sm:text-[18px]"
            :class="
              form.priority === 'important' &&
              'tab-active bg-red-400 text-white'
            "
          >
            Important
          </button>
          <button
            type="button"
            @click="priorityController('medium')"
            role="tab"
            class="tab rounded-lg h-full transition-all sm:text-[18px]"
            :class="
              form.priority === 'medium' &&
              'tab-active bg-yellow-400 text-white'
            "
          >
            Medium
          </button>
          <button
            type="button"
            @click="priorityController('optional')"
            role="tab"
            class="tab rounded-lg h-full transition-all sm:text-[18px]"
            :class="
              form.priority === 'optional' &&
              'tab-active bg-green-400 text-white'
            "
          >
            Optional
          </button>
        </div>
        <textarea
          class="textarea textarea-ghost rounded-md"
          rows="7"
          placeholder="Description (optional)"
          v-model="form.description"
        />
        <p class="text-red-400">{{ error }}</p>
        <button
          @click="completeTask"
          type="submit"
          class="btn text-white sm:text-[18px]"
          :class="form.isFinished ? 'btn-warning' : 'btn-success'"
        >
          {{ form.isFinished ? "Undo" : "Complete" }}
        </button>
      </form>
    </div>
  </div>
</template>
