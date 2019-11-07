<template>
  <v-card light flat class="mx-auto">
    <v-toolbar dense flat>
      <v-card-title>Cloud Credentials</v-card-title>
      <template v-slot:extension>
        <v-tabs v-model="tab" background-color="transparent" grow>
          <v-tabs-slider></v-tabs-slider>
          <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="text in texts" :key="text">
        <v-card flat>
          <v-card-text>
            <keep-alive>
              <component v-bind:is="text"></component>
            </keep-alive>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>


<script>
import AWSTab from "./CloudCredentialsTab/AWS";
export default {
  name: "CloudCredentialsTab",
  components: {
    AWSTab
  },
  data() {
    return {
      tab: null,
      items: ["AWS", "Microsoft", "Backups"],
      texts: ["AWSTab", "Microsoft", "Backups"]
    };
  }
};
</script>