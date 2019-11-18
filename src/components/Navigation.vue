<template>
  <v-navigation-drawer expand-on-hover width="300" mini-variant-width="85" hide-overlay app>
    <v-list>
      <v-list-item>
        <v-list-item-title>
          <img height="52px" src="../assets/Logo_AptitudeTechnologies.png" alt="logo" />
        </v-list-item-title>
      </v-list-item>

      <!-- <v-divider></v-divider> -->
      <v-list-item to="/">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>

      <v-list-item v-for="n in getMenuItems" @click="() => {}" :key="n.id" :to="n.path">
        <v-list-item-icon>
          <v-icon>{{ n.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ n.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navigation",
  computed: {
    ...mapGetters(["getCustomerEmail", "getLoggedIn", "getMenuItems"])
  }
};
</script>
