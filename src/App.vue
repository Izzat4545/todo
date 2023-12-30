<script lang="ts">
import List from "./components/taskList/ParentList.vue";
import Header from "./components/Header.vue";
export default {
  data() {
    return {};
  },
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
