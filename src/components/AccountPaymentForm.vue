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
    companynameErrors() {
      const errors = [];
      if (!this.$v.companyname.$dirty) return errors;
      !this.$v.companyname.maxLength &&
        errors.push("company name must be at most 25 characters long");
      !this.$v.companyname.required && errors.push("company name is required.");
      return errors;
    }
  },
  methods: {
    ...mapActions(["createSubscription"]),
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
          accountdata: {
            account_holder_type: this.account_holder_type,
            account_number: this.account_number,
            account_holder_name: this.account_holder_name,
            routing_number: this.routing_number,
            country: this.country,
            currency: this.currency
          }
        };
        console.log(submitedData);
        // setTimeout(() => {
        //   this.createSubscription(customerData)
        //     .then(() => {
        //       this.submitStatus = "DONE";
        //     })
        //     .catch(() => {
        //       this.submitStatus = "ERROR";
        //     });
        // });
      }
    }
  }
};
</script>