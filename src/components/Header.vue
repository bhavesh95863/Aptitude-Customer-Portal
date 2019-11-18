<template>
  <v-app-bar app>
    <v-avatar tile height="48" width="auto">
      <!-- <img src="../assets/Logo_AptitudeTechnologies.png" alt="logo" /> -->
      <!-- <router-link height="40px" to="/"><img src="../assets/Logo_AptitudeTechnologies.png" alt="logo"></router-link> -->
    </v-avatar>

    <div class="flex-grow-1"></div>

    <v-toolbar-items>
      <!-- <v-btn text to="/">Home</v-btn> -->
      <!-- <v-btn text to="/about">About</v-btn> -->
      <v-menu left bottom offset-y close-on-click v-if="getLoggedIn">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">{{getCustomerEmail}}</v-btn>
        </template>
        <v-list>
          <!-- <v-list-item v-for="n in getMenuItems" @click="() => {}" :key="n.id" :to="n.path">
            <v-list-item-title>{{ n.text }}</v-list-item-title>
          </v-list-item>-->
          <v-list-item @click="() => {this.userLogout()}">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn text v-if="!getLoggedIn" to="/login">Login</v-btn>
      <!-- <v-btn text v-if="!getLoggedIn" to="/register">Register</v-btn> -->
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import store from '../store'
export default {
  name: "Header",
  computed: {
    ...mapGetters(["getCustomerEmail", "getLoggedIn", "getMenuItems"])
  },
  methods: {
    ...mapActions(["userLogout"])
    // ...mapGetters(['getMenuItems']),
  },
  data: () => ({
    // menu_items:
  })
};
</script>
