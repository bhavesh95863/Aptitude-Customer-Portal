<template>
  <v-card>
    <v-toolbar flat dark color="#472F92">
      <v-toolbar-title>Subscriptions and Services</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs v-model="tab" background-color="transparent" grow>
          <v-tabs-slider></v-tabs-slider>
          <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="text in texts" :key="text">
        <keep-alive>
          <component v-bind:is="text"></component>
        </keep-alive>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>


<script>
import { mapActions } from "vuex";
import SubscriptionsCreateTab from "./SubscriptionsServicesTabs/SubscriptionsCreate.vue";
import SetupPaymentsTab from "./SubscriptionsServicesTabs/SetupPayments.vue";

export default {
  name: "SubscriptionsServicesPage",
  components: {
    SubscriptionsCreateTab,
    SetupPaymentsTab
  },
  data() {
    // var items[] = "Create Subscription Account";
    return {
      tab: null,
      items: ["Create Subscription Account"],
      texts: ["SubscriptionsCreateTab"]
    };
  },
  methods: {
    ...mapActions(["get_stripe_customer_id"]),
    checkStripeCustomerId: function() {
      this.get_stripe_customer_id().then(result => {
        if (result == true) {
          this.items.push("Setup Payments");
          this.texts.push("SetupPaymentsTab");
        }
      });
    }
  },
  mounted() {
    this.checkStripeCustomerId();
  }
};
</script>