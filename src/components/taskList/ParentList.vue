<script lang="ts">
import ChildList from "./ChildList.vue";
import data from "../../data/data.json";
export default {
  data() {
    return {
      tasks: data,
    };
  },
  components: {
    ChildList,
  },
};
</script>

<template>
  <div class="w-[50%] m-auto">
    <div v-for="(task, index) in tasks.tasks" :key="index">
      <div class="text-lg text-center py-3">
        {{ Object.keys(task)[index] }}
      </div>
      <ul>
        <ChildList :tasks="task" />
      </ul>
    </div>
  </div>
</template>
