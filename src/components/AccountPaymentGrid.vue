<template>
  <v-row>
    <v-col>
      <v-data-table :headers="headers" :items="accounts"></v-data-table>
    </v-col>
  </v-row>
</template>


<script>
import { mapActions } from "vuex";

export default {
  name: "AccountPaymentGrid",
  data: () => ({
    headers: [
      { text: "Bank Name", value: "bank_name" },
      { text: "Acc Number", value: "last4" },
      { text: "Account holder name", value: "account_holder_name" }

      //   { text: "account holder type", value: "account_holder_type" },
      //   { text: "currency", value: "currency" }
    ],
    accounts: []
  }),
  methods: {
    ...mapActions(["getAccountsData"]),
    initCardsData: function() {
      this.getAccountsData().then(accountsData => {
        this.accounts = accountsData;
      });
    }
  },
  mounted() {
    this.initCardsData();
  }
};
</script>