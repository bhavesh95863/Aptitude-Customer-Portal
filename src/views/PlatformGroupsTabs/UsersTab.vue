<template>
  <v-card light flat class="mx-auto">
    <v-card-title>Add User</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <Register/>  
    </v-card-text>
    <v-card-title>Reset Password</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      
    </v-card-text>
  </v-card>
</template>


<script>
// import { mapActions, mapGetters } from "vuex";
import Register from '../../components/Register'
export default {
  name: "UsersTab",
  components: {
    Register
  },
  // computed: {
  //   ...mapGetters(["getCustomerEmail", "getLoggedIn"]),
  // },
  // methods: {
  //   ...mapActions(["changePassword"])
  // }
};
</script>