<script lang="ts">
import {
  isUserSignedIn,
  logInUser,
} from "../../utils/firebaseUtils/FirebaseAuth";

export default {
  data() {
    return {
      error: "",
      form: {
        email: "",
        password: "",
      },
    };
  },
  beforeMount() {
    this.redirectBasedOnSignInStatus();
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
    async submit() {
      if (this.form.password && this.form.email) {
        try {
          await logInUser(this.form.email, this.form.password);
          this.redirectBasedOnSignInStatus();
        } catch (error) {
          this.error = (error as Error).message || "An error occurred";
        }
      } else {
        this.error = "Please fill all fields";
      }
    },
  },
};
</script>
<template>
  <div class="h-screen w-full flex justify-center items-center">
    <div
      class="bg-base-200 p-5 rounded-lg overflow-hidden max-w-[350px] w-[70%] sm:w-[100%]"
    >
      <div class="text-center mb-2 text-[20px]">Login</div>
      <form @submit.prevent="submit" class="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          class="input input-bordered"
          v-model="form.email"
        />
        <input
          type="password"
          placeholder="Password"
          class="input input-bordered"
          v-model="form.password"
        />
        <button class="btn text-white btn-success">Submit</button>
        <p class="text-red-400">{{ error }}</p>
      </form>
      <p>
        If you already have an account
        <router-link class="text-primary" to="/register">register</router-link>
      </p>
    </div>
  </div>
</template>
