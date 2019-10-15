<template>
  <div class="home">
    <h1>Welcome Home</h1>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <v-btn v-on:click="getUsername">Get User</v-btn>   -->
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "HomePage",
  components: {},
  methods: {
    ...mapActions(["getUsername"]),
    getCUsername() {
      this.getUsername();
    }
  }
};
</script>
