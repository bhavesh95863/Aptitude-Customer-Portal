<template>
  <v-hover v-on:mouseover="mouseover" v-on:mouseleave="mouseleave" v-slot:default="{ hover }">
    <v-navigation-drawer
      v-if="getLoggedIn"
      width="300"
      mini-variant-width="85"
      hide-overlay
      app
      :mini-variant="!hover"
    >
      <v-list>
        <v-list-item>
          <v-list-item-title>
            <img height="52px" src="../assets/Logo_AptitudeTechnologies.png" alt="logo" />
          </v-list-item-title>
        </v-list-item>

        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon color="#472F92">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>

        <v-list-item v-for="n in getMenuItems" @click="() => {}" :key="n.id" :to="n.path">
          <v-list-item-icon>
            <v-icon color="#472F92">{{ n.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ n.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-hover>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navigation",
  computed: {
    ...mapGetters(["getCustomerEmail", "getLoggedIn", "getMenuItems"])
  },
  methods: {
    mouseover: function() {
      this.hover = true;
    },
    mouseleave: function() {
      this.hover = false;
    }
  },
  data: () => ({
    hover: false
  })
};
</script>
