<template>
  <v-form @submit.prevent="onSubmit" :disabled="submitStatus === 'PENDING'">
    <v-list-item-title class="headline mb-1">Bank Account Details</v-list-item-title>
    <v-select
      v-model="account_holder_type"
      :items="account_holder_type_list"
      menu-props="auto"
      label="Select account holder type"
      prepend-inner-icon="mdi-account"
      :error-messages="account_holder_typeErrors"
      @input="$v.account_holder_type.$touch()"
      @blur="$v.account_holder_type.$touch()"
    ></v-select>
    <v-text-field
      label="Account Number"
      v-model="account_number"
      prepend-inner-icon="mdi-account"
      :error-messages="account_numberErrors"
      required
      @input="$v.account_number.$touch()"
      @blur="$v.account_number.$touch()"
    />
    <v-text-field
      label="Account Holder's Name"
      v-model="account_holder_name"
      prepend-inner-icon="mdi-account"
      :error-messages="account_holder_nameErrors"
      required
      @input="$v.account_holder_name.$touch()"
      @blur="$v.account_holder_name.$touch()"
    />
    <v-text-field
      label="Routing number"
      v-model="routing_number"
      prepend-inner-icon="mdi-account"
      :error-messages="routing_numberErrors"
      required
      @input="$v.routing_number.$touch()"
      @blur="$v.routing_number.$touch()"
    />
    <v-card-actions>
      <v-btn :disabled="submitStatus == 'PENDING'" type="submit">Create</v-btn>
    </v-card-actions>
  </v-form>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";

import {
  required,
  maxLength,
  minLength,
  email,
  numeric
} from "vuelidate/lib/validators";

export default {
  name: "AccountPaymentForm",
  data: () => ({
    stripe: "",
    submitStatus: null,
    object: "bank_account",
    account_holder_type: "",
    account_number: "",
    account_holder_name: "",
    routing_number: "",
    country: "",
    currency: "",
    account_holder_type_list: [
      {
        text: "Individual",
        value: "individual"
      },
      {
        text: "company",
        value: "company"
      }
    ]
  }),

  mixins: [validationMixin],
  validations: {
    account_holder_type: { required },
    account_number: { required },
    account_holder_name: { required },
    routing_number: { required }
  },
  computed: {
    ...mapGetters(["getCustomerEmail", "getLoggedIn"]),
    account_holder_typeErrors() {
      const errors = [];
      if (!this.$v.account_holder_type.$dirty) return errors;
      !this.$v.account_holder_type.required && errors.push("It is required.");
      return errors;
    },
    account_numberErrors() {
      const errors = [];
      if (!this.$v.account_number.$dirty) return errors;
      !this.$v.account_number.required && errors.push("It is required.");
      return errors;
    },
    account_holder_nameErrors() {
      const errors = [];
      if (!this.$v.account_holder_name.$dirty) return errors;
      !this.$v.account_holder_name.required && errors.push("It is required.");
      return errors;
    },
    routing_numberErrors() {
      const errors = [];
      if (!this.$v.routing_number.$dirty) return errors;
      !this.$v.routing_number.required && errors.push("It is required.");
      return errors;
    }
  },
  methods: {
    ...mapActions(["createBankAccount", "getPublicKey"]),
    onSubmit(e) {
      if (this.submitStatus == "PENDING") {
        return;
      }
      this.submitStatus = "SUBMITTED";
      e.preventDefault();
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        return;
      } else {
        this.submitStatus = "PENDING";
        var submitedData = {
          type: "bank_account",
          bank_account: {
            country: "US",
            currency: "usd",
            account_holder_name: this.account_holder_name,
            account_holder_type: this.account_holder_type,
            routing_number: this.routing_number,
            account_number: this.account_number
          }
        };

        this.stripe.createToken("bank_account", submitedData).then(bank => {
          if (bank.token) {
            var tokenData = {
              token: bank.token.id
            };
            setTimeout(() => {
              this.createBankAccount(tokenData)
                .then(() => {
                  this.submitStatus = "DONE";
                })
                .catch(() => {
                  this.submitStatus = "ERROR";
                });
            });
          } else {
            this.submitStatus = "ERROR";
          }
        });
      }
    },
    initStripe: function() {
      this.getPublicKey().then(publicKey => {
        this.stripe = Stripe(publicKey);
      });
    }
  },
  created() {
    this.initStripe();
  }
};
</script>