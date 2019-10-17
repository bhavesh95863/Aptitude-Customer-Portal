<template>
  <v-card light flat class="mx-auto">
    <v-card-title>Security Settings</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit" :disabled="submitStatus === 'PENDING'">
        <v-text-field
          label="Current Passowrd"
          v-model="currentPassword"
          type="password"
          prepend-inner-icon="mdi-lock"
          :error-messages="passwordErrors"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        />
        <v-text-field
          label="New Passowrd"
          v-model="newPassword"
          type="password"
          prepend-inner-icon="mdi-lock"
          :error-messages="newPasswordErrors"
          required
          @input="$v.newPassword.$touch()"
          @blur="$v.newPassword.$touch()"
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
          <v-btn :disabled="submitStatus == 'PENDING'" type="submit">Apply</v-btn>
          <v-btn type="reset">Cancle</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
   
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
  name: "SecuritySettingsTab",
  data: () => ({
    currentPassword: "",
    newPassword: "",
    repeatPassword: ""
  }),
  mixins: [validationMixin],
  validations: {
    password: { required, minLength: minLength(6) },
    newPassword: { required, minLength: minLength(6) },
    repeatPassword: { sameAsPassword: sameAs("password") }
  },
  computed: {
    ...mapGetters(["getCustomerEmail", "getLoggedIn"]),
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must be at most 6 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    newPasswordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) return errors;
      !this.$v.newPassword.minLength &&
        errors.push("Password must be at most 6 characters long");
      !this.$v.newPassword.required && errors.push("Password is required.");
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