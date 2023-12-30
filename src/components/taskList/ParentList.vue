<script lang="ts">
import ChildList from "./ChildList.vue";
import { MyData } from "../../types/Tasks";
import { readData } from "../../utils/firebaseUtils/FirebaseCrud";
import { formatDate } from "../../utils/formatDates";

export default {
  data() {
    return {
      tasks: {} as MyData | undefined,
    };
  },
  components: {
    ChildList,
  },
  methods: {
    formatDates(date: string) {
      return formatDate(date);
    },
  },
  async mounted() {
    this.tasks = await readData("tasks");
  },
};
</script>

<template>
  <div class="w-[50%] m-auto">
    <div v-for="(task, key) in tasks" :key="key">
      <div class="text-lg text-center py-3">
        {{ formatDates(key.toString()) }}
      </div>
      <ul>
        <ChildList
          v-for="(taskDetail, detailKey) in task"
          :key="detailKey"
          :tasks="taskDetail"
        />
      </ul>
    </div>
  </div>
</template>
