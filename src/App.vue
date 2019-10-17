<template>
  <v-app>
    <Header />
    <v-content>
      <v-container fluid>
        <Alert />
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Alert from "./components/Alert";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    Alert
  },
  methods: {
    ...mapActions(["getUsername"]),
    getUsername: function() {
      this.getUsername();
    }
  },
  data: () => ({
    //
  })
};
</script>