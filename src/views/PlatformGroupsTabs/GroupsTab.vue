<template>
  <v-card light flat class="mx-auto">
    <v-card-title>
      Super Admin
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchSuperUsers"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="users.super_admin" :search="searchSuperUsers"></v-data-table>

    <v-divider></v-divider>

    <v-card-title>
      Admin
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchAdminUsers"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="users.admin_user" :search="searchAdminUsers"></v-data-table>

    <v-divider></v-divider>

    <v-card-title>
      Billing
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchBillingUsers"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="users.billing_user" :search="searchBillingUsers"></v-data-table>

    <v-divider></v-divider>

    <v-card-title>
      Normal
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchNormalUsers"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="users.normal_user" :search="searchNormalUsers"></v-data-table>

    <v-divider></v-divider>
  </v-card>
</template>


<script>
import { mapActions } from "vuex";
export default {
  name: "GroupsTab",
  data() {
    return {
      searchSuperUsers: "",
      searchAdminUsers: "",
      searchBillingUsers: "",
      searchNormalUsers: "",
      headers: [
        {
          text: "User Id",
          align: "left",
          sortable: false,
          value: "user_id"
        },
        { text: "Firstname", value: "first_name" },
        { text: "Lastname", value: "last_name" },
        { text: "Status", value: "status" },
        { text: "Role", value: "user_role" }
      ],
      users: {}
    };
  },
  methods: {
    ...mapActions(["getUserGroups"]),
    getUserGroupsData: function() {
      this.getUserGroups().then(userData => {
        this.users = userData;
      });
    }
  },
  created() {
    this.getUserGroupsData();
  }
};
</script>