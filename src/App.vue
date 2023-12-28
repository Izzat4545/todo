<script lang="ts">
import List from "./components/taskList/List.vue";
import Header from "./components/Header.vue";
export default {
  components: {
    List,
    Header,
  },
};
</script>

<template>
  <Header />
  <List />
</template>
