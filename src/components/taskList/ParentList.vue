<script lang="ts">
import ChildList from "./ChildList.vue";
import { MyData } from "../../types/Tasks";
import { readData } from "../../utils/firebaseUtils/FirebaseCrud";
import { formatDate } from "../../utils/formatDates";

export default {
  data() {
    return {
      isLoading: false,
      tasksFromServer: {} as MyData | undefined,
      tasksFromState: {} as MyData | undefined,
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
    this.isLoading = true;
    this.tasksFromServer = await readData("tasks");
    this.tasksFromState = JSON.parse(JSON.stringify(this.tasksFromServer));
    this.isLoading = false;
  },
};
</script>

<template>
  <div v-if="!isLoading" class="w-[50%] m-auto">
    <div v-for="(task, key) in tasksFromState" :key="key">
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
  <!-- SKELET -->
  <div
    v-if="isLoading"
    v-for="index in 10"
    :key="index"
    class="border border-blue-300 my-2 shadow rounded-md overflow-hidden w-[50%] m-auto"
  >
    <div class="animate-pulse flex gap-1">
      <div class="bg-slate-700 h-[80px] px-2"></div>
      <div class="flex w-full gap-3 justify-between items-center">
        <div class="w-full">
          <div class="h-3 bg-slate-700 my-2 w-[80%] rounded col-span-2"></div>
          <div class="h-3 bg-slate-700 w-[50%] rounded col-span-2"></div>
        </div>
        <div class="h-6 w-6 bg-slate-700 rounded-full mr-4"></div>
      </div>
    </div>
  </div>
</template>
