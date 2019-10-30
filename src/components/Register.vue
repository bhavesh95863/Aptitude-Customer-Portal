<template>
  <v-card class="mx-auto">
    <v-card-title>Account Details</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit" :disabled="submitStatus === 'PENDING'">
        <v-select
          :items="UserTypes"
          v-model="usertype"
          prepend-inner-icon="mdi-account-circle"
          label="User Type"
        ></v-select>
        <v-text-field
          label="Username"
          :error-messages="usernameErrors"
          v-model="username"
          prepend-inner-icon="mdi-account-circle"
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
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
          label="Passowrd"
          v-model="password"
          type="password"
          prepend-inner-icon="mdi-lock"
          :error-messages="passwordErrors"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        />
        <v-text-field
          label="Repeat Password "
          v-model="repeatPassword"
          type="password"
          prepend-inner-icon="mdi-lock"
          :error-messages="sameAsPasswordErrors"
          required
          @input="$v.repeatPassword.$touch()"
          @blur="$v.repeatPassword.$touch()"
        />
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
  sameAs
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data: () => ({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    repeatPassword: "",
    usertype: "",
    UserTypes: [
        'Super Admin',
        'Admin',
        'Billing User',
        'Normal User'
    ],
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
    username: { required, maxLength: maxLength(10) },
    email: { required, email },
    firstname: { required, maxLength: maxLength(10) },
    lastname: { required, maxLength: maxLength(10) },
    password: { required, minLength: minLength(6) },
    repeatPassword: { sameAsPassword: sameAs("password") }
  },
  computed: {
    ...mapGetters(["getCustomerEmail", "getLoggedIn"]),
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required.");
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
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must be at most 6 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    sameAsPasswordErrors() {
      const errors = [];
      if (!this.$v.repeatPassword.$dirty) return errors;
      !this.$v.repeatPassword.sameAsPassword &&
        errors.push("Password must be identical.");
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
        registerData.append("usertype", this.usertype);
        registerData.append("username", this.username);
        registerData.append("email", this.email);
        registerData.append("first_name", this.firstname);
        registerData.append("last_name", this.lastname);
        registerData.append("password", this.password);

        //call VuexAction for login
        setTimeout(() => {
          this.doRegister(registerData)
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