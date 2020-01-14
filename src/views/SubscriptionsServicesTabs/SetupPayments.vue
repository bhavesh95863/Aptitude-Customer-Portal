<template>
  <v-card light flat class="mx-auto">
    <v-card-title>Setup Subscription Payments</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <CardPaymentForm />
          <!-- <CardPaymentGrid /> -->
        </v-col>
        <v-col cols="6">
          <AccountPaymentForm />
          <AccountPaymentGrid />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import CardPaymentForm from "../../components/CardPaymentForm.vue";
import AccountPaymentForm from "../../components/AccountPaymentForm.vue";
import AccountPaymentGrid from "../../components/AccountPaymentGrid.vue";

export default {
  name: "SetupPayments",
  components: {
    CardPaymentForm,
    AccountPaymentForm,
    AccountPaymentGrid
  }
};
</script>