<template>
  <v-form @submit.prevent="onSubmit" :disabled="submitStatus === 'PENDING'">
    <v-list-item-title class="headline mb-1">Card Details</v-list-item-title>
    <v-row>
      <v-col>
        <v-text-field
          label="Card holder's Name"
          v-model="name"
          prepend-inner-icon="mdi-account-circle"
          :error-messages="nameErrors"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        />
        <div class="sr-input sr-element sr-card-element" id="card-element">
          <!-- A Stripe card Element will be inserted here. -->
        </div>
        <div class="sr-field-error" id="card-errors" role="alert"></div>

        <v-card-actions class="mt-2">
          <v-btn id="submit-card" :disabled="submitStatus == 'PENDING'" type="submit">Create</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-form>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";

import { required, maxLength } from "vuelidate/lib/validators";

export default {
  name: "CardPaymentForm",
  data: () => ({
    id: "cus_GNtXzGqlQ2vYBK",
    number: "",
    name: "",
    card: "",
    stripe: "",
    elements: "",
    setupIntent: "",
    submitStatus: null
  }),

  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(40) }
  },
  computed: {
    ...mapGetters(["getCustomerEmail", "getLoggedIn"]),
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 40 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    }
  },
  methods: {
    ...mapActions([
      "createSubscriptionCard",
      "getPublicKey",
      "createSetupIntent",
      "syncCustomerCard"
    ]),
    onSubmit(e) {
      e.preventDefault();
      if (this.submitStatus == "PENDING") {
        return;
      }
      this.submitStatus = "SUBMITTED";
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        return;
      } else {
        this.submitStatus = "PENDING";
        var self = this;
        this.stripe
          .confirmCardSetup(this.setupIntent.client_secret, {
            payment_method: {
              card: this.card,
              billing_details: { name: this.name }
            }
          })
          .then(function(result) {
            if (result.error) {
              self.submitStatus = "ERROR";
              var displayError = document.getElementById("card-errors");
              displayError.textContent = result.error.message;
            } else {
              var submitedData = {
                pm_token: result.setupIntent.payment_method
              };
              self.initSyncCustomerCard(submitedData);
            }
          });
      }
    },
    initSyncCustomerCard: function(submitedData) {
      this.syncCustomerCard(submitedData)
        .then(() => {
          this.submitStatus = "DONE";
        })
        .catch(() => {
          this.submitStatus = "ERROR";
        });
    },

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
      this.stripe = Stripe(publicKey);
      this.elements = this.stripe.elements();
      this.setupIntent = setupIntent;
      // Element styles
      var style = {
        base: {
          fontSize: "16px",
          color: "#32325d",
          fontFamily: "Roboto, sans-serif",
          fontSmoothing: "antialiased",
          "::placeholder": {
            color: "rgba(0, 0, 0, 0.6)"
          }
        }
      };

      this.card = this.elements.create("card", { style: style });

      this.card.mount("#card-element");

      // Element focus ring
      this.card.on("focus", function() {
        var el = document.getElementById("card-element");
        el.classList.add("focused");
      });

      this.card.on("blur", function() {
        var el = document.getElementById("card-element");
        el.classList.remove("focused");
      });
    }
  },
  mounted() {
    this.initStripe();
  }
};
</script>

<style>
#card-errors {
  color: #ff5252 !important;
  caret-color: #ff5252 !important;
  font-size: 12px;
}
#card-element {
  padding: 8px 0 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  margin-bottom: 5px;
}
</style>