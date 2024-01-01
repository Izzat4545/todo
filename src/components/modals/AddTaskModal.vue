<script lang="ts">
// import { postData } from "../../utils/firebaseUtils/FirebaseCrud";
export default {
  data() {
    return {
      error: "",
      form: {
        title: "",
        priority: "",
        description: "",
        isFinished: false,
      },
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
    priorityController(selectedBtn: string) {
      this.form.priority = selectedBtn;
    },
    async submit() {
      if (this.form.priority && this.form.title.length > 0) {
        this.error = "";
        this.$emit("submit", this.form);
      } else {
        this.error = "Please fill all the fields";
      }
    },
  },
  watch: {
    showModal(newValue) {
      if (!newValue) {
        // Reset the form when showModal becomes false
        this.form = {
          title: "",
          priority: "",
          description: "",
          isFinished: false,
        };
      }
    },
  },
};
</script>

<template>
  <div class="modal" :class="{ 'modal-open': showModal }">
    <div class="modal-box">
      <form method="dialog">
        <button
          @click="() => closeModal()"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
      </form>
      <p class="py-4 text-[20px] text-center">Add task</p>
      <form @submit.prevent="submit" class="flex flex-col justify-center gap-2">
        <input
          class="input input-bordered rounded-md"
          type="text"
          placeholder="Title"
          v-model="form.title"
        />
        <div class="tabs">
          <button
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
