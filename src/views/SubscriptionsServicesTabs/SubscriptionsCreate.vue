<template>
  <v-card light flat class="mx-auto">
    <v-card-title>Create Subscription Account</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit" :disabled="submitStatus === 'PENDING'">
        <v-row>
          <v-col cols="6">
            <v-list-item-title class="headline mb-1">Account Details</v-list-item-title>
            <v-text-field
              label="Company Name"
              v-model="companyname"
              prepend-inner-icon="mdi-account-circle"
              :error-messages="companynameErrors"
              required
              @input="$v.companyname.$touch()"
              @blur="$v.companyname.$touch()"
            />
            <v-text-field
              label="E-mail"
              :error-messages="emailErrors"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              v-model="email"
              prepend-inner-icon="mdi-email"
            />
            <v-text-field
              label="Phone"
              :error-messages="phoneErrors"
              v-model="phone"
              prepend-inner-icon="mdi-phone"
              @input="$v.phone.$touch()"
              @blur="$v.phone.$touch()"
            />
          </v-col>
          <v-col cols="6">
            <v-list-item-title class="headline mb-1">Tax</v-list-item-title>
            <v-select
              v-model="taxType"
              :items="taxList"
              menu-props="auto"
              label="Select Tax Type"
              prepend-inner-icon="mdi-flag"
              :error-messages="taxTypeErrors"
              @input="$v.taxType.$touch()"
              @blur="$v.taxType.$touch()"
            ></v-select>
            <v-text-field
              label="Registration ID"
              :error-messages="taxIdErrors"
              v-model="taxId"
              prepend-inner-icon="mdi-phone"
              @input="$v.taxId.$touch()"
              @blur="$v.taxId.$touch()"
            />

            <!-- label="TPS/TVH Registration ID" -->
            <!-- label="TVQ Registration ID" -->
          </v-col>
          <v-col cols="6">
            <v-list-item-title class="headline mb-1">Billing Address</v-list-item-title>
            <v-text-field
              label="Address Line 1"
              v-model="billingLine1"
              prepend-inner-icon="mdi-account-circle"
              :error-messages="billingLine1Errors"
              required
              @input="$v.billingLine1.$touch()"
              @blur="$v.billingLine1.$touch()"
            />
            <v-text-field
              label="Address Line 2"
              v-model="billingLine2"
              prepend-inner-icon="mdi-account-circle"
            />
            <v-text-field
              label="City"
              v-model="billingCity"
              prepend-inner-icon="mdi-account-circle"
            />
            <v-text-field
              label="State"
              v-model="billingState"
              prepend-inner-icon="mdi-account-circle"
            />
            <v-text-field
              label="Country"
              v-model="billingCountry"
              prepend-inner-icon="mdi-account-circle"
            />
            <v-text-field
              label="Postal Code"
              v-model="billingPostalCode"
              prepend-inner-icon="mdi-account-circle"
            />
          </v-col>
          <v-col cols="6">
            <v-list-item-title class="headline mb-1">Shipping Address</v-list-item-title>
            <v-text-field
              label="Address Line 1"
              v-model="shippingLine1"
              prepend-inner-icon="mdi-account-circle"
              :error-messages="shippingLine1Errors"
              required
              @input="$v.shippingLine1.$touch()"
              @blur="$v.shippingLine1.$touch()"
            />
            <v-text-field
              label="Address Line 2"
              v-model="shippingLine2"
              prepend-inner-icon="mdi-account-circle"
            />
            <v-text-field
              label="City"
              v-model="shippingCity"
              prepend-inner-icon="mdi-account-circle"
            />
            <v-text-field
              label="State"
              v-model="shippingState"
              prepend-inner-icon="mdi-account-circle"
            />
            <v-text-field
              label="Country"
              v-model="shippingCountry"
              prepend-inner-icon="mdi-account-circle"
            />
            <v-text-field
              label="Postal Code"
              v-model="shippingPostalCode"
              prepend-inner-icon="mdi-account-circle"
            />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn :disabled="submitStatus == 'PENDING'" type="submit">Create</v-btn>
        </v-card-actions>
        <!-- <div>{{submitStatus}}</div> -->
      </v-form>
    </v-card-text>
  </v-card>
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
  name: "SubscriptionsCreate",
  data: () => ({
    companyname: "",
    email: "",
    phone: "",
    billingLine1: "",
    billingLine2: "",
    billingCity: "",
    billingState: "",
    billingCountry: "",
    billingPostalCode: "",
    shippingLine1: "",
    shippingLine2: "",
    shippingCity: "",
    shippingState: "",
    shippingCountry: "",
    shippingPostalCode: "",
    taxType: "",
    taxId: "",
    taxList: ["TPSTVH", "TVQ"],
    submitStatus: null
  }),
  mixins: [validationMixin],
  validations: {
    companyname: { required, maxLength: maxLength(25) },
    email: { required, email },
    phone: { required, numeric, minLength: minLength(7) },
    taxId: { required },
    taxType: { required },
    billingLine1: { required },
    shippingLine1: { required }
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
    },
    companyErrors() {
      const errors = [];
      if (!this.$v.companyaddress.$dirty) return errors;
      !this.$v.companyaddress.maxLength &&
        errors.push("company addresss must be at most 100 characters long");
      !this.$v.companyaddress.required &&
        errors.push("company address is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.minLength &&
        errors.push("phone must be minimum 7 characters long");
      !this.$v.phone.numeric && errors.push("phone must be numeric");
      !this.$v.phone.required && errors.push("Phone is required.");
      return errors;
    },
    taxTypeErrors() {
      const errors = [];
      if (!this.$v.taxType.$dirty) return errors;
      !this.$v.taxType.required && errors.push("Tax Type is required.");
      return errors;
    },
    taxIdErrors() {
      const errors = [];
      if (!this.$v.taxId.$dirty) return errors;
      !this.$v.taxId.required &&
        errors.push("Tax Registration ID is required.");
      return errors;
    },
    billingLine1Errors() {
      const errors = [];
      if (!this.$v.billingLine1.$dirty) return errors;
      !this.$v.billingLine1.required &&
        errors.push("Billing line 1 is required.");
      return errors;
    },
    shippingLine1Errors() {
      const errors = [];
      if (!this.$v.shippingLine1.$dirty) return errors;
      !this.$v.shippingLine1.required &&
        errors.push("Shipping line 1 is required.");
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

        // var customerData = [];
        // customerData["name"] = this.companyname;
        // customerData["email"] = this.email;
        // customerData["phone"] = this.phone;
        // customerData["metadata[tax_type]"] = this.taxType;
        // customerData["metadata[tax_id]"] = this.taxId;
        // customerData["address[line1]"] = this.billingLine1;
        // customerData["address[line2]"] = this.billingLine2;
        // customerData["address[city]"] = this.billingCity;
        // customerData["address[state]"] = this.billingState;
        // customerData["address[country]"] = this.billingCountry;
        // customerData["address[postal_code]"] = this.billingPostalCode;
        // customerData["shipping[name]"] = this.companyname;
        // customerData["shipping[phone]"] = this.phone;
        // customerData["shipping[address][line1]"] = this.shippingLine1;
        // customerData["shipping[address][line2]"] = this.shippingLine2;
        // customerData["shipping[address][city]"] = this.shippingCity;
        // customerData["shipping[address][state]"] = this.shippingState;
        // customerData["shipping[address][country]"] = this.shippingCountry;
        // customerData[
        //   "shipping[address][postal_code]"
        // ] = this.shippingPostalCode;
        var customerData = {
          name: this.companyname,
          email: this.email,
          phone: this.phone,
          metadata: {
            tax_type: this.taxType,
            tax_id: this.taxId
          },
          address: {
            line1: this.billingLine1,
            line2: this.billingLine2,
            city: this.billingCity,
            state: this.billingState,
            country: this.billingCountry,
            postal_code: this.billingPostalCode
          },
          shipping: {
            name: this.companyname,
            phone: this.phone,
            address: {
              line1: this.shippingLine1,
              line2: this.shippingLine2,
              city: this.shippingCity,
              state: this.shippingState,
              country: this.shippingCountry,
              postal_code: this.shippingPostalCode
            }
          }
        };
        const customerFormData = new FormData();
        customerFormData.append("data", customerData);

        // console.log(customerData);
        setTimeout(() => {
          this.createSubscription(customerFormData)
            .then(() => {
              this.submitStatus = "DONE";
            })
            .catch(() => {
              this.submitStatus = "ERROR";
            });
        });
      }
    }
  }
};
</script>