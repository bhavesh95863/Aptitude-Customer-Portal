<template>
  <v-card light flat class="mx-auto">
    <v-card-title>Main Technical Contact</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit" :disabled="submitStatus === 'PENDING'">
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
        <v-text-field
          label="Ext"
          :error-messages="ExtErrors"
          prepend-inner-icon="mdi-phone-settings"
          v-model="ext"
          @input="$v.ext.$touch()"
          @blur="$v.ext.$touch()"
        />
        <v-text-field
          label="Cell"
          :error-messages="cellErrors"
          v-model="cell"
          prepend-inner-icon="mdi-cellphone"
          @input="$v.cell.$touch()"
          @blur="$v.cell.$touch()"
        />
        <v-text-field
          label="Address Line #1"
          :error-messages="addressline1Errors"
          v-model="addressline1"
          prepend-inner-icon="mdi-map-marker"
          @input="$v.addressline1.$touch()"
          @blur="$v.addressline1.$touch()"
        />
        <v-text-field
          label="Address Line #2"
          :error-messages="addressline2Errors"
          v-model="addressline2"
          prepend-inner-icon="mdi-map-marker"
          @input="$v.addressline2.$touch()"
          @blur="$v.addressline2.$touch()"
        />
        <v-text-field
          label="City"
          :error-messages="cityErrors"
          v-model="city"
          prepend-inner-icon="mdi-city"
          @input="$v.city.$touch()"
          @blur="$v.city.$touch()"
        />
        <v-text-field
          label="Postal / Zip code"
          :error-messages="postalErrors"
          v-model="postal"
          prepend-inner-icon="mdi-code-array"
          @input="$v.postal.$touch()"
          @blur="$v.postal.$touch()"
        />
        <v-select
          v-model="country"
          :items="country"
          menu-props="auto"
          label="Select Country"
          prepend-inner-icon="mdi-flag"
          :error-messages="countryErrors"
          @input="$v.country.$touch()"
          @blur="$v.country.$touch()"
        ></v-select>
        <v-select
          v-model="state"
          :items="state"
          menu-props="auto"
          label="Select State"
          prepend-inner-icon="mdi-map"
          :error-messages="stateErrors"
          @input="$v.state.$touch()"
          @blur="$v.state.$touch()"
        ></v-select>
        <v-card-actions>
          <v-btn :disabled="submitStatus == 'PENDING'" type="submit">Apply</v-btn>
          <v-btn type="reset">Cancle</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-title>Additional Technical Contacts</v-card-title>

    <v-card-text>
      <p class="subtitle-1">Technical Contact #2</p>
      <v-form @submit.prevent="onSubmit" :disabled="submitStatus === 'PENDING'">
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
        <v-text-field
          label="Ext"
          :error-messages="ExtErrors"
          prepend-inner-icon="mdi-phone-settings"
          v-model="ext"
          @input="$v.ext.$touch()"
          @blur="$v.ext.$touch()"
        />
        <v-text-field
          label="Cell"
          :error-messages="cellErrors"
          v-model="cell"
          prepend-inner-icon="mdi-cellphone"
          @input="$v.cell.$touch()"
          @blur="$v.cell.$touch()"
        />
        <v-text-field
          label="Address Line #1"
          :error-messages="addressline1Errors"
          v-model="addressline1"
          prepend-inner-icon="mdi-map-marker"
          @input="$v.addressline1.$touch()"
          @blur="$v.addressline1.$touch()"
        />
        <v-text-field
          label="Address Line #2"
          :error-messages="addressline2Errors"
          v-model="addressline2"
          prepend-inner-icon="mdi-map-marker"
          @input="$v.addressline2.$touch()"
          @blur="$v.addressline2.$touch()"
        />
        <v-text-field
          label="City"
          :error-messages="cityErrors"
          v-model="city"
          prepend-inner-icon="mdi-city"
          @input="$v.city.$touch()"
          @blur="$v.city.$touch()"
        />
        <v-text-field
          label="Postal / Zip code"
          :error-messages="postalErrors"
          v-model="postal"
          prepend-inner-icon="mdi-code-array"
          @input="$v.postal.$touch()"
          @blur="$v.postal.$touch()"
        />
        <v-select
          v-model="country"
          :items="country"
          menu-props="auto"
          label="Select Country"
          prepend-inner-icon="mdi-flag"
          :error-messages="countryErrors"
          @input="$v.country.$touch()"
          @blur="$v.country.$touch()"
        ></v-select>
        <v-select
          v-model="state"
          :items="state"
          menu-props="auto"
          label="Select State"
          prepend-inner-icon="mdi-map"
          :error-messages="stateErrors"
          @input="$v.state.$touch()"
          @blur="$v.state.$touch()"
        ></v-select>
        <v-card-actions>
          <v-btn :disabled="submitStatus == 'PENDING'" type="submit">Apply</v-btn>
          <v-btn type="reset">Cancle</v-btn>
        </v-card-actions>
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
  name: "TechnicalContactsTab",
  data: () => ({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    repeatPassword: "",
    submitStatus: null
  }),
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