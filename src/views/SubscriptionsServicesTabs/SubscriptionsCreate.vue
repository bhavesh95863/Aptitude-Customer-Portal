<template>
  <v-card light flat class="mx-auto mt-10">
    <v-card-title>Create Stripe Subscriptions Account</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit" :disabled="submitStatus === 'PENDING'">
        <v-row>
          <v-col>
            <v-card-title>Stripe Account</v-card-title>
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
              label="Company Billing Address"
              v-model="companyaddress"
              prepend-inner-icon="mdi-account-circle"
              :error-messages="companyaddressErrors"
              required
              @input="$v.companyaddress.$touch()"
              @blur="$v.companyaddress.$touch()"
            />
            <v-text-field
              label="Firstname"
              v-model="firstname"
              prepend-inner-icon="mdi-account-circle"
              :error-messages="firstnameErrors"
              required
              @input="$v.firstname.$touch()"
              @blur="$v.firstname.$touch()"
            />
            <v-text-field
              label="Lastname"
              v-model="lastname"
              prepend-inner-icon="mdi-account-circle"
              :error-messages="lastnameErrors"
              required
              @input="$v.lastname.$touch()"
              @blur="$v.lastname.$touch()"
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
          <v-col>
            <v-card-title>Payment Method</v-card-title>
            <v-text-field
              label="TPS/TVH Registration ID"
              :error-messages="TPSErrors"
              v-model="TPSTVH"
              prepend-inner-icon="mdi-phone"
              @input="$v.TPSTVH.$touch()"
              @blur="$v.TPSTVH.$touch()"
            />
            <v-text-field
              label="TVQ Registration ID"
              :error-messages="TVQErrors"
              v-model="TVQ"
              prepend-inner-icon="mdi-phone"
              @input="$v.TVQ.$touch()"
              @blur="$v.TVQ.$touch()"
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
    companyaddress: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    submitStatus: null
  }),
  // data: () => ({
  //   username: "nilesh",
  //   email: "nils.mkwna@gmail.com",
  //   firstname: "nilesh",
  //   lastname: "nilesh",
  //   password: "nilesh",
  //   repeatPassword: "nilesh",
  //   submitStatus: null
  // }),
  mixins: [validationMixin],
  validations: {
    companyname: { required, maxLength: maxLength(25) },
    companyaddress: { required, maxLength: maxLength(100) },
    firstname: { required, maxLength: maxLength(10) },
    lastname: { required, maxLength: maxLength(10) },
    email: { required, email },
    phone: { required, numeric, minLength: minLength(7) }
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
    companyaddressErrors() {
      const errors = [];
      if (!this.$v.companyaddress.$dirty) return errors;
      !this.$v.companyaddress.maxLength &&
        errors.push("company addresss must be at most 100 characters long");
      !this.$v.companyaddress.required &&
        errors.push("company address is required.");
      return errors;
    },
    firstnameErrors() {
      const errors = [];
      if (!this.$v.firstname.$dirty) return errors;
      !this.$v.firstname.maxLength &&
        errors.push("Firstname must be at most 10 characters long");
      !this.$v.firstname.required && errors.push("Firstame is required.");
      return errors;
    },
    lastnameErrors() {
      const errors = [];
      if (!this.$v.lastname.$dirty) return errors;
      !this.$v.lastname.maxLength &&
        errors.push("Lastname must be at most 10 characters long");
      !this.$v.lastname.required && errors.push("Lastname is required.");
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
    }
  },
  methods: {
    ...mapActions(["doRegister"]),
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
        const registerData = new FormData();
        registerData.append("companyname", this.companyname);
        registerData.append("companyaddress", this.companyaddress);
        registerData.append("first_name", this.firstname);
        registerData.append("last_name", this.lastname);
        registerData.append("email", this.email);
        registerData.append("phone", this.phone);
        console.log(registerData);
        //call VuexAction for login
        // setTimeout(() => {
        //   this.doRegister(registerData)
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