<template>
  <v-row>
    <v-col>
      <v-data-table :headers="headers" :items="accounts">
        <template v-slot:item.action="{ item }">
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
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
      { text: "Account holder name", value: "account_holder_name" },
      { text: "Actions", value: "action", sortable: false }
    ],
    accounts: []
  }),
  methods: {
    ...mapActions(["getAccountsData", "deleteBankAccount"]),
    initCardsData: function() {
      this.getAccountsData().then(accountsData => {
        this.accounts = accountsData;
      });
    },
    deleteItem: function(item) {
      var submitedData = {
        token: item.id
      };
      confirm("Are you sure you want to delete this bank account?") &&
        this.deleteBankAccount(submitedData)
          .then(() => {
            this.submitStatus = "DONE";
          })
          .catch(() => {
            this.submitStatus = "ERROR";
          });
    }
  },
  mounted() {
    this.initCardsData();
  }
};
</script>