<template>
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
      :error-messages="extErrors"
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
      :items="countrylist"
      menu-props="auto"
      label="Select Country"
      prepend-inner-icon="mdi-flag"
      :error-messages="countryErrors"
      @input="$v.country.$touch()"
      @blur="$v.country.$touch()"
    ></v-select>
    <v-select
      v-model="state"
      :items="statelist"
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
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs,
  numeric
} from "vuelidate/lib/validators";

export default {
  name: "ContactForm",
  data: () => ({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    ext: "",
    cell: "",
    addressline1: "",
    addressline2: "",
    city: "",
    postal: "",
    country: "",
    countrylist: ["Canada", "india"],
    state: "",
    statelist: ["state1", "state2"],
    submitStatus: null
  }),
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    firstname: { required, maxLength: maxLength(10) },
    lastname: { required, maxLength: maxLength(10) },
    phone: { required, numeric, minLength: minLength(7) },
    ext: { required, minLength: minLength(3) },
    cell: {
      required,
      numeric,
      minLength: minLength(10),
      maxLength: maxLength(10)
    },
    addressline1: { required, maxLength: maxLength(30) },
    addressline2: { maxLength: maxLength(30) },
    city: { required, maxLength: maxLength(30) },
    postal: { required },
    country: { required },
    state: { required }
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
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.minLength &&
        errors.push("phone must be minimum 7 characters long");
      !this.$v.phone.numeric && errors.push("phone must be numeric");
      !this.$v.phone.required && errors.push("Phone is required.");
      return errors;
    },
    extErrors() {
      const errors = [];
      if (!this.$v.ext.$dirty) return errors;
      !this.$v.ext.minLength &&
        errors.push("Ext must be minimum 3 characters long");
      !this.$v.ext.required && errors.push("Ext is required.");
      return errors;
    },
    cellErrors() {
      const errors = [];
      if (!this.$v.cell.$dirty) return errors;
      !this.$v.cell.numeric && errors.push("cell must be numeric");
      !this.$v.cell.minLength &&
        errors.push("cell must be minimum 10 characters long");
      !this.$v.cell.maxLength &&
        errors.push("cell must be maximum 10 characters long");
      !this.$v.cell.required && errors.push("cell is required.");
      return errors;
    },
    addressline1Errors() {
      const errors = [];
      if (!this.$v.addressline1.$dirty) return errors;
      !this.$v.addressline1.maxLength &&
        errors.push("address must be maximum 30 characters long");
      !this.$v.addressline1.required && errors.push("address is required.");
      return errors;
    },
    addressline2Errors() {
      const errors = [];
      if (!this.$v.addressline2.$dirty) return errors;
      !this.$v.addressline2.maxLength &&
        errors.push("address must be maximum 30 characters long");
      return errors;
    },
    cityErrors() {
      const errors = [];
      if (!this.$v.city.$dirty) return errors;
      !this.$v.city.maxLength &&
        errors.push("City must be maximum 30 characters long");
      !this.$v.city.required && errors.push("City is required.");
      return errors;
    },
    postalErrors() {
      const errors = [];
      if (!this.$v.postal.$dirty) return errors;
      !this.$v.postal.required && errors.push("postal/zipcode is required.");
      return errors;
    },
    countryErrors() {
      const errors = [];
      if (!this.$v.country.$dirty) return errors;
      !this.$v.country.required && errors.push("country is required.");
      return errors;
    },
    stateErrors() {
      const errors = [];
      if (!this.$v.state.$dirty) return errors;
      !this.$v.state.required && errors.push("state is required.");
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