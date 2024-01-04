<script lang="ts">
import List from "../components/taskList/ParentList.vue";
import Header from "../components/Header.vue";
import { useTaskListStore } from "../store/TaskListStore";
import { themeChange } from "theme-change";
import Register from "./auth/Register.vue";
import Login from "./auth/Login.vue";
import { isUserSignedIn } from "../utils/firebaseUtils/FirebaseAuth";

export default {
  data() {
    return {
      taskListStore: useTaskListStore(),
    };
  },
  methods: {
    async redirectBasedOnSignInStatus() {
      const userSignedIn = await isUserSignedIn();
      if (userSignedIn) {
        // Redirect to '/' if user is signed in and currently on the 'login' page
        this.$router.push("/");
      } else {
        // Redirect to 'login' if user is signed out and not on the 'login' page
        this.$router.push("/login");
      }
    },
  },
  beforeMount() {
    this.redirectBasedOnSignInStatus();
  },

  async mounted() {
    await this.taskListStore.fetchTasks();
    themeChange(false);
  },
  components: {
    List,
    Header,
    Register,
    Login,
  },
};
</script>

<template>
  <router-view></router-view>
  <div class="bg-base-200/65 sticky z-10 top-0 mb-5 flex justify-center">
    <Header />
  </div>
  <List />
</template>
