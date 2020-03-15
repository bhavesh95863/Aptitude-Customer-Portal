<template>
  <v-card light flat class="mx-auto">
    <v-card-text>
      <v-form @submit.prevent="onSubmit" :disabled="submitStatus === 'PENDING'">
        <v-row>
          <v-col class="pt-0 pb-0" cols="6">
            <v-text-field
              label="Account Id"
              v-model="firstname"
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
            <v-file-input
              v-model="files"
              placeholder="Upload Key Pairs"
              label="Key pairs"
              multiple
              prepend-icon="mdi-key"
            >
              <template v-slot:selection="{ text }">
                <v-chip small label color="primary">{{ text }}</v-chip>
              </template>
            </v-file-input>
          </v-col>
        </v-row>
        <v-divider></v-divider>

        <v-row align-content="justify">
          <v-col class="pt-0 pb-0" cols="6">
            <v-text-field
              label="IAM User"
              :error-messages="iamuserErrors"
              v-model="phone"
              prepend-inner-icon="mdi-account"
              @input="$v.iamuser.$touch()"
              @blur="$v.iamuser.$touch()"
            />
          </v-col>
          <v-col class>
            <v-btn class="ma-2">Modify</v-btn>
            <v-btn class="ma-2">Delete</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-0 pb-0" cols="6">
            <v-text-field
              label="Access Key ID"
              :error-messages="accesskeyidErrors"
              v-model="accesskeyid"
              prepend-inner-icon="mdi-key"
              @input="$v.accesskeyid.$touch()"
              @blur="$v.accesskeyid.$touch()"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-0 pb-0" cols="6">
            <v-text-field
              label="Secret Access key"
              :error-messages="secretaccesskeyErrors"
              v-model="secretaccesskey"
              prepend-inner-icon="mdi-key"
              @input="$v.secretaccesskey.$touch()"
              @blur="$v.secretaccesskey.$touch()"
            />
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-btn>Add AWS IAM User</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn>Create IAM User</v-btn>
          </v-col>
        </v-row>
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
  name: "ContactForm",
  data: () => ({
    name: "",
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
    countryList: ["Canada", "india"],
    state: "",
    stateList: ["state1", "state2"],
    submitStatus: null,
    fetched: {
      name: "",
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
      state: ""
    }
  }),
  props: ["contactType"],
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
        contactData.append("contact_type", this.contactType);
        contactData.append("name", this.fetched.name);
        contactData.append("email", this.email);
        contactData.append("first_name", this.firstname);
        contactData.append("last_name", this.lastname);
        contactData.append("phone", this.phone);
        contactData.append("ext", this.ext);
        contactData.append("cell", this.cell);
        contactData.append("address_line1", this.addressline1);
        contactData.append("address_line2", this.addressline2);
        contactData.append("city", this.city);
        contactData.append("postal", this.postal);
        contactData.append("country", this.country);
        contactData.append("state", this.state);
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
          this.name = this.fetched.name = userData.name;
          this.email = this.fetched.email = userData.email;
          this.firstname = this.fetched.firstname = userData.first_name;
          this.lastname = this.fetched.lastname = userData.last_name;
          this.phone = this.fetched.phone = userData.phone;
          this.ext = this.fetched.ext = userData.ext;
          this.cell = this.fetched.cell = userData.cell;
          this.addressline1 = this.fetched.addressline1 =
            userData.address_line1;
          this.addressline2 = this.fetched.addressline2 =
            userData.address_line2;
          this.city = this.fetched.city = userData.city;
          this.postal = this.fetched.postal = userData.pincode;
          this.country = this.fetched.country = userData.country;
          this.state = this.fetched.state = userData.state;
        }
      });
    },
    assignFetchedValue: function() {
      this.email = this.fetched.email;
      this.firstname = this.fetched.firstname;
      this.lastname = this.fetched.lastname;
      this.phone = this.fetched.phone;
      this.ext = this.fetched.ext;
      this.cell = this.fetched.cell;
      this.addressline1 = this.fetched.addressline1;
      this.addressline2 = this.fetched.addressline2;
      this.city = this.fetched.city;
      this.postal = this.fetched.postal;
      this.country = this.fetched.country;
      this.state = this.fetched.state;
    }
  },
  created() {
    this.getContactData();
  }
};
</script>