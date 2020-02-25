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
        <!-- <p>{{getMenuItems}}</p> -->

        <!-- loop for main menuitem -->
        <v-list-group
          v-for="(menuitem, menuitemLabel) in openapimenu"
          prepend-icon="mdi-view-dashboard"
          :value="false"
          :key="menuitemLabel"
        >
          <template v-slot:activator>
            <v-list-item-title>{{menuitemLabel}}</v-list-item-title>
          </template>

          <!-- if menu item has child menus -->
          <template v-if="isObject(menuitem)">
            <v-list-group
              v-for="(submenuitem, subMenuItemContent) in menuitem"
              :key="subMenuItemContent"
              sub-group
              :value="false"
            >
              <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon color="#472F92">mdi-view-dashboard</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{subMenuItemContent}}</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item v-for="(item, itm) in submenuitem" :key="itm" link>
                <v-list-item-icon>
                  <v-icon>{{item[1]}}</v-icon>
                </v-list-item-icon>
                <v-list-item-title v-text="item[0]"></v-list-item-title>
              </v-list-item>
            </v-list-group>
          </template>
          <template v-else>
            <!-- if no child elements -->
            <v-list-item v-for="(item, it) in menuitem" :key="it" link>
              <v-list-item-icon>
                <v-icon>{{item[1]}}</v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="item[0]"></v-list-item-title>
            </v-list-item>
          </template>
        </v-list-group>

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
    },
    isObject: function(o) {
      /* eslint no-console: ["error", { allow: ["warn", "log"] }] */
      // console.log(o);
      return typeof o[0] !== "object";
    }
  },
  data: () => ({
    hover: false,

    // openapimenu: {
    //   Check: [
    //     ["ping", "mdi-account-edit"],
    //     ["add contact", "mdi-account-edit"],
    //     ["get contact list", "mdi-account-edit"]
    //   ]
    // }
    openapimenu: {
      Contacts: [
        ["List", "mdi-account-edit"],
        ["New", "mdi-account-edit"],
        ["Delete", "mdi-account-edit"]
      ],
      CRM: {
        Leads: [
          ["Listt", "mdi-account-edit"],
          ["Neww", "mdi-account-edit"],
          ["Deletee", "mdi-account-edit"]
        ],
        Leads2: [
          ["Listt", "mdi-account-edit"],
          ["Neww", "mdi-account-edit"],
          ["Deletee", "mdi-account-edit"]
        ]
      }
    }
    // [
    //   ["Management", "mdi-account-edit"],
    //   ["Settings", "mdi-account-edit"]
    // ]
  })
};
</script>
