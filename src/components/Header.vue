<template>
  <v-app-bar app lgiht>
    <v-avatar tile height="48" width="auto">
      <img src="../assets/Logo_AptitudeTechnologies.png" alt="logo" />
      <!-- <router-link height="40px" to="/"><img src="../assets/Logo_AptitudeTechnologies.png" alt="logo"></router-link> -->
    </v-avatar>

    <div class="flex-grow-1"></div>

    <v-toolbar-items>
      <v-btn text href="#/">Home</v-btn>
      <!-- <router-link to="/" tag="li">HomeR</router-link> -->
      <v-btn text href="#/about">About</v-btn>
      <v-menu left bottom offset-y close-on-click v-if="getLoggedIn">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">{{getCustomerEmail}}</v-btn>
        </template>
        <v-list>
          <v-list-item v-for="n in getMenuItems" @click="() => {}" :key="n.id">
            <v-list-item-title>{{ n.text }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="() => {this.userLogout()}">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn text v-if="!getLoggedIn" href="#/login">Login</v-btn>
      <v-btn text v-if="!getLoggedIn" href="#/register">Register</v-btn>
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
