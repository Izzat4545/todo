<script lang="ts">
import ChildList from "./ChildList.vue";
import { formatDate } from "../../utils/formatDates";
import { useTaskListStore } from "../../store/TaskListStore";
export default {
  data() {
    return {
      taskListStore: useTaskListStore(),
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
};
</script>

<template>
  <div
    v-if="taskListStore.tasksFromState && !taskListStore.isLoading"
    class="w-[90%] sm:w-[50%] m-auto"
  >
    <div v-for="(task, key) in taskListStore.tasksFromState" :key="key">
      <div class="text-lg text-center py-3">
        {{ formatDates(key.toString()) }}
      </div>
      <ul>
        <ChildList
          v-for="(taskDetail, detailKey) in task"
          :key="detailKey"
          :tasks="taskDetail"
          :date="key.toString()"
          :index="detailKey"
        />
      </ul>
    </div>
  </div>
  <!-- SKELET -->
  <div
    v-if="taskListStore.isLoading"
    v-for="index in 10"
    :key="index"
    class="my-2 skeleton shadow rounded-md overflow-hidden w-[50%] m-auto"
  >
    <div class="flex gap-1">
      <div class="bg-[#9b9b9b] h-[80px] px-2"></div>
      <div class="flex w-full gap-3 justify-between items-center">
        <div class="w-full">
          <div class="h-3 bg-[#9b9b9b] my-2 w-[80%] rounded col-span-2"></div>
          <div class="h-3 bg-[#9b9b9b] w-[50%] rounded col-span-2"></div>
        </div>
        <div class="h-6 w-6 bg-[#9b9b9b] rounded-full mr-4"></div>
      </div>
    </div>
  </div>
</template>
