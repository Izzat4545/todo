<script lang="ts">
import {
  isUserSignedIn,
  registerUser,
} from "../../utils/firebaseUtils/FirebaseAuth";
export default {
  data() {
    return {
      error: "",
      form: {
        email: "",
        password: "",
        repeatedPassword: "",
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
        this.$router.push("/register");
      }
    },
    async submit() {
      if (this.form.password && this.form.email && this.form.repeatedPassword) {
        try {
          if (this.form.password === this.form.repeatedPassword) {
            await registerUser(this.form.email, this.form.password);
            this.redirectBasedOnSignInStatus();
          } else {
            this.error = "Passwords are not matching";
          }
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
      <div class="text-center mb-2 text-[20px]">Register</div>
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
        <input
          type="password"
          placeholder="Repeat Password"
          class="input input-bordered"
          v-model="form.repeatedPassword"
        />
        <button class="btn text-white btn-success">Submit</button>
        <p class="text-red-400">{{ error }}</p>
      </form>
      <p>
        If you already have an account
        <router-link class="text-primary" to="/login">login</router-link>
      </p>
    </div>
  </div>
</template>
