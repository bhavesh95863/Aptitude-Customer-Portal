<template>
  <v-card>
    <v-toolbar flat dark color="#472F92">
      <v-toolbar-title>Profile Settings</v-toolbar-title>
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
import UserInformationTab from "./ProfileSettingsTabs/UserInformationTab"
import SecuritySettingsTab from "./ProfileSettingsTabs/SecuritySettingsTab"

export default {
  name: "ProfileSettingPage",
  components: {
    UserInformationTab,
    SecuritySettingsTab
  },
  data() {
    return {
      tab: null,
      items: [
        "User Information",
        "Security Settings"
      ],
      texts: [
        "UserInformationTab",
        "SecuritySettingsTab"
      ]
    };
  }
};
</script>