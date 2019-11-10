<template>
  <v-card light flat class="mx-auto">
    <v-card-text>
      <v-form @submit.prevent="onSubmit" :disabled="submitStatus === 'PENDING'">
        <v-row>
          <v-col class="pt-0 pb-0" cols="6">
            <v-text-field
              label="Management Account"
              v-model="account"
              prepend-inner-icon="mdi-account-circle"
              :error-messages="accountErrors"
              required
              @input="$v.account.$touch()"
              @blur="$v.account.$touch()"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-0 pb-0" cols="6">
            <v-text-field
              label="Passowrd"
              v-model="password"
              type="password"
              prepend-inner-icon="mdi-lock"
              :error-messages="passwordErrors"
              required
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            />
          </v-col>
        </v-row>

        <v-card-actions>
          <v-btn :disabled="submitStatus == 'PENDING'" type="submit">Modify</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ContactForm",
  data: () => ({
    account: "",
    password: "",
    submitStatus: null,
    fetched: {
      account: "",
      password: ""
    }
  }),
  mixins: [validationMixin],
  validations: {
    account: { required },
    password: { required }
  },
  computed: {
    ...mapGetters(["getCustomerEmail", "getLoggedIn"]),
    accountErrors() {
      const errors = [];
      if (!this.$v.account.$dirty) return errors;
      !this.$v.account.required && errors.push("Account is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    }
  },
  methods: {
    ...mapActions(["getContactDetails", "setContactDetails"]),
    onSubmit(e) {
      if (this.submitStatus == "PENDING") {
        return;
      }
      this.submitStatus = "SUBMITTED";
      //prevent from form submit
      e.preventDefault();
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        return;
      } else {
        this.submitStatus = "PENDING";
        //create form data object
        const contactData = new FormData();
        contactData.append("account", this.account);
        contactData.append("password", this.password);
        //call VuexAction for login
        setTimeout(() => {
          // console.log(registerData);
          this.setContactDetails(contactData)
            .then(() => {
              this.submitStatus = "DONE";
            })
            .catch(() => {
              this.submitStatus = "ERROR";
            });
        });
      }
    },
    getContactData: function() {
      this.getContactDetails(this.contactType).then(userData => {
        if (typeof userData !== "undefined") {
          this.account = this.fetched.account = userData.account;
          this.password = this.fetched.password = userData.password;
        }
      });
    },
    assignFetchedValue: function() {
      this.account = this.fetched.account;
      this.password = this.fetched.password;
    }
  },
  created() {
    this.getContactData();
  }
};
</script>