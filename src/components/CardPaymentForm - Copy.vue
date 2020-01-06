<template>
  <v-form @submit.prevent="onSubmit" :disabled="submitStatus === 'PENDING'">
    <v-list-item-title class="headline mb-1">Card Details</v-list-item-title>
    <v-row>
      <v-col cols="6">
        <div class="sr-payment-form card">
          <div class="sr-form-row">
            <input type="text" id="email" placeholder="Email address" />
            <br />
            <br />
          </div>

          <div class="sr-form-row">
            <div class="sr-input sr-element sr-card-element" id="card-element">
              <!-- A Stripe card Element will be inserted here. -->
            </div>
          </div>
          <div class="sr-field-error" id="card-errors" role="alert"></div>
          <br />
          <button id="submit">
            <div class="spinner hidden" id="spinner"></div>
            <span id="button-text">Link your card to your account</span>
          </button>
        </div>
        <!-- <v-text-field
          label="Card Number"
          v-model="number"
          prepend-inner-icon="mdi-credit-card"
          :error-messages="numberErrors"
          maxlength="16"
          required
          @input="$v.number.$touch()"
          @blur="$v.number.$touch()"
        />-->
      </v-col>
    </v-row>
    <!-- <v-label>More Details (optional)</v-label>
    <v-text-field
      label="Card holder's Name"
      v-model="name"
      prepend-inner-icon="mdi-credit-card"
      :error-messages="nameErrors"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    />
    <v-text-field
      label="Address Line 1"
      v-model="address_line1"
      prepend-inner-icon="mdi-map-marker"
      :error-messages="address_line1Errors"
      required
      @input="$v.address_line1.$touch()"
      @blur="$v.address_line1.$touch()"
    />
    <v-text-field
      label="Address Line 2"
      v-model="address_line2"
      prepend-inner-icon="mdi-map-marker"
      :error-messages="address_line2Errors"
      required
      @input="$v.address_line2.$touch()"
      @blur="$v.address_line2.$touch()"
    />
    <v-text-field
      label="City"
      v-model="address_city"
      prepend-inner-icon="mdi-city"
      :error-messages="address_cityErrors"
      required
      @input="$v.address_city.$touch()"
      @blur="$v.address_city.$touch()"
    />
    <v-text-field
      label="State"
      v-model="address_state"
      prepend-inner-icon="mdi-map"
      :error-messages="address_stateErrors"
      required
      @input="$v.address_state.$touch()"
      @blur="$v.address_state.$touch()"
    />
    <v-text-field
      label="Zip Poastcode"
      v-model="address_zip"
      prepend-inner-icon="mdi-code-array"
      :error-messages="address_zipErrors"
      required
      @input="$v.address_zip.$touch()"
      @blur="$v.address_zip.$touch()"
    />
    <v-text-field
      label="Country"
      v-model="address_country"
      prepend-inner-icon="mdi-flag"
      :error-messages="address_countryErrors"
      required
      @input="$v.address_country.$touch()"
      @blur="$v.address_country.$touch()"
    />-->
    <!-- <v-card-actions>
      <v-btn :disabled="submitStatus == 'PENDING'" type="submit">Create</v-btn>
    </v-card-actions>-->
  </v-form>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";

import {
  required,
  maxLength,
  minLength,
  maxValue,
  email,
  numeric
} from "vuelidate/lib/validators";

export default {
  name: "CardPaymentForm",
  data: () => ({
    id: "cus_GNtXzGqlQ2vYBK",
    number: "",
    exp_month: "",
    exp_year: "",
    name: "",
    address_line1: "",
    address_line2: "",
    address_city: "",
    address_state: "",
    address_zip: "",
    address_country: "",
    submitStatus: null
  }),

  mixins: [validationMixin],
  validations: {
    number: {
      required,
      numeric,
      maxLength: maxLength(16),
      minLength: minLength(16)
    },
    exp_month: {
      required,
      numeric,
      maxLength: maxLength(2),
      minLength: minLength(2),
      maxValue: maxValue(12)
    },
    exp_year: {
      required,
      numeric,
      maxLength: maxLength(4),
      minLength: minLength(4)
    },
    name: { maxLength: maxLength(40) },
    address_line1: { maxLength: maxLength(40) },
    address_line2: { maxLength: maxLength(40) },
    address_city: { maxLength: maxLength(40) },
    address_zip: {},
    address_country: {},
    address_state: {}
  },
  computed: {
    ...mapGetters(["getCustomerEmail", "getLoggedIn"]),
    numberErrors() {
      const errors = [];
      if (!this.$v.number.$dirty) return errors;
      !this.$v.number.maxLength && errors.push("Account number is not valid");
      !this.$v.number.minLength && errors.push("Account number is not valid");
      !this.$v.number.numeric && errors.push("Account number must be Numeric");
      return errors;
    },
    exp_monthErrors() {
      const errors = [];
      if (!this.$v.exp_month.$dirty) return errors;
      !this.$v.exp_month.maxLength && errors.push("Expiry Month is Invalid");
      !this.$v.exp_month.minLength && errors.push("Expiry Month is Invalid");
      !this.$v.exp_month.maxValue && errors.push("Expiry Month is Invalid");
      !this.$v.exp_month.numeric && errors.push("Expiry Month must be Numeric");
      return errors;
    },
    exp_yearErrors() {
      const errors = [];
      if (!this.$v.exp_year.$dirty) return errors;
      !this.$v.exp_year.maxLength && errors.push("Expiry Year is Invalid");
      !this.$v.exp_year.minLength && errors.push("Expiry Year is Invalid");
      !this.$v.exp_year.numeric && errors.push("Expiry Year must be Numeric");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 40 characters long");
      return errors;
    },
    address_line1Errors() {
      const errors = [];
      if (!this.$v.address_line1.$dirty) return errors;
      !this.$v.address_line1.maxLength &&
        errors.push("address must be maximum 40 characters long");
      return errors;
    },
    address_line2Errors() {
      const errors = [];
      if (!this.$v.address_line2.$dirty) return errors;
      !this.$v.address_line2.maxLength &&
        errors.push("address must be maximum 40 characters long");
      return errors;
    },
    address_cityErrors() {
      const errors = [];
      if (!this.$v.address_city.$dirty) return errors;
      !this.$v.address_city.maxLength &&
        errors.push("City must be maximum 40 characters long");
      return errors;
    },
    address_zipErrors() {
      const errors = [];
      if (!this.$v.address_zip.$dirty) return errors;
      return errors;
    },
    address_countryErrors() {
      const errors = [];
      if (!this.$v.address_country.$dirty) return errors;
      return errors;
    },
    address_stateErrors() {
      const errors = [];
      if (!this.$v.address_state.$dirty) return errors;
      return errors;
    }
  },
  methods: {
    ...mapActions([
      "createSubscriptionCard",
      "getPublicKey",
      "createSetupIntent"
    ]),
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

        var customerData = [];
        customerData["source[object]"] = "card";
        customerData["source[number]"] = this.number;
        customerData["source[exp_month]"] = this.exp_month;
        customerData["source[exp_year]"] = this.exp_year;
        customerData["source[name]"] = this.name;
        customerData["source[address_line1]"] = this.address_line1;
        customerData["source[address_line2]"] = this.address_line2;
        customerData["source[address_city]"] = this.address_city;
        customerData["source[address_state]"] = this.address_state;
        customerData["source[address_zip]"] = this.address_zip;
        customerData["source[address_country]"] = this.address_country;
        // console.log(customerData);
        setTimeout(() => {
          this.createSubscriptionCard(customerData)
            .then(() => {
              this.submitStatus = "DONE";
            })
            .catch(() => {
              this.submitStatus = "ERROR";
            });
        });
      }
    },
    // initStripe: function() {
    //   const stripe = Stripe("sk_test_LjTcfpPKfD8qX67Wk1rsf3JK");
    //   const elements = stripe.elements();
    //   const cardElement = elements.create("card");
    //   cardElement.mount("#card-element");
    //   // Handle real-time validation errors from the card Element.
    //   card.addEventListener("change", function(event) {
    //     var displayError = document.getElementById("card-errors");
    //     if (event.error) {
    //       displayError.textContent = event.error.message;
    //     } else {
    //       displayError.textContent = "";
    //     }
    //   });

    //   // Handle form submission.
    //   var form = document.getElementById("payment-form");
    //   form.addEventListener("submit", function(event) {
    //     event.preventDefault();

    //     stripe.createToken(card).then(function(result) {
    //       if (result.error) {
    //         // Inform the user if there was an error.
    //         var errorElement = document.getElementById("card-errors");
    //         errorElement.textContent = result.error.message;
    //       } else {
    //         // Send the token to your server.
    //         stripeTokenHandler(result.token);
    //       }
    //     });
    //   });

    //   // Submit the form with the token ID.
    //   function stripeTokenHandler(token) {
    //     // Insert the token ID into the form so it gets submitted to the server
    //     var form = document.getElementById("payment-form");
    //     var hiddenInput = document.createElement("input");
    //     hiddenInput.setAttribute("type", "hidden");
    //     hiddenInput.setAttribute("name", "stripeToken");
    //     hiddenInput.setAttribute("value", token.id);
    //     form.appendChild(hiddenInput);

    //     // Submit the form
    //     form.submit();
    //   }
    // },
    initStripe: function() {
      this.getPublicKey().then(publicKey => {
        this.getSetupIntent(publicKey);
      });
    },
    getSetupIntent: function(publicKey) {
      this.createSetupIntent().then(setupIntent => {
        this.stripeElements(publicKey, setupIntent);
      });
    },
    stripeElements: function(publicKey, setupIntent) {
      var stripe = Stripe(publicKey);
      var elements = stripe.elements();

      // Element styles
      var style = {
        base: {
          fontSize: "16px",
          color: "#32325d",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
          fontSmoothing: "antialiased",
          "::placeholder": {
            color: "rgba(0,0,0,0.4)"
          }
        }
      };

      var card = elements.create("card", { style: style });

      card.mount("#card-element");

      // Element focus ring
      card.on("focus", function() {
        var el = document.getElementById("card-element");
        el.classList.add("focused");
      });

      card.on("blur", function() {
        var el = document.getElementById("card-element");
        el.classList.remove("focused");
      });

      // Handle payment submission when user clicks the pay button.
      var button = document.getElementById("submit");
      button.addEventListener("click", function(event) {
        event.preventDefault();
        // changeLoadingState(true);
        var email = document.getElementById("email").value;

        stripe
          .confirmCardSetup(setupIntent.client_secret, {
            payment_method: {
              card: card,
              billing_details: { email: email }
            }
          })
          .then(function(result) {
            if (result.error) {
              // changeLoadingState(false);
              var displayError = document.getElementById("card-errors");
              displayError.textContent = result.error.message;
            } else {
              // The PaymentMethod was successfully setup
              // Be sure to attach the PaymentMethod to a Customer as shown by
              // the server webhook in this sample
              // orderComplete(stripe, setupIntent.client_secret);
            }
          });
      });
    }
  },
  mounted() {
    this.initStripe();
  }
};
</script>