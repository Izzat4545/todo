<script lang="ts">
import { useTaskListStore } from "../../store/TaskListStore";
export default {
  data() {
    return {
      error: "",
      taskListStore: useTaskListStore(),
      form: {
        title: "",
        priority: "",
        description: "",
        isFinished: false,
      },
    };
  },
  methods: {
    priorityController(selectedBtn: string) {
      this.form.priority = selectedBtn;
    },
    async submit() {
      if (this.form.priority && this.form.title.length > 0) {
        this.$emit("submit", this.form);
        this.taskListStore.postTasks(this.form);

        this.exitModal();
      } else {
        this.error = "Please fill all the fields";
      }
    },

    exitModal() {
      this.taskListStore.toggleAddTaskModal();
      this.form = {
        title: "",
        priority: "",
        description: "",
        isFinished: false,
      };
      this.error = "";
    },
  },
};
</script>

<template>
  <div class="modal z-20" :class="{ 'modal-open': taskListStore.addTaskModal }">
    <div class="modal-box">
      <form method="dialog">
        <button
          @click="exitModal"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
      </form>
      <p class="pb-4 text-[20px] text-center">Add task</p>
      <form @submit.prevent="submit" class="flex flex-col justify-center gap-2">
        <input
          class="input input-bordered rounded-md"
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
          class="textarea textarea-bordered rounded-md"
          rows="7"
          placeholder="Description (optional)"
          v-model="form.description"
        />
        <p class="text-red-400">{{ error }}</p>
        <button type="submit" class="btn btn-success text-white sm:text-[18px]">
          Add task
        </button>
      </form>
    </div>
  </div>
</template>
