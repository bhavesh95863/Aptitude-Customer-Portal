<template>
  <v-app>
    <Header />
    <Navigation />
    <v-content>
      <v-container fluid>
        <Alert />
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
    <Loader />
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Alert from "./components/Alert";
import Loader from "./components/Loader";
import Navigation from "./components/Navigation";
import { mapActions } from "vuex";
import "vuetify/dist/vuetify.min.css";
export default {
  name: "App",
  components: {
    Header,
    Alert,
    Loader,
    Navigation
  },
  methods: {
    // ...mapActions(["getUsername"]),
    ...mapActions(["getUsername", "initOpenApi"]),
    getUsername: function() {
      this.getUsername();
    }
  },
  data: () => ({
    //
  }),
  created() {
    // call this function to get the openapi spec from server and process other data.
    this.initOpenApi();
  }
};
</script>