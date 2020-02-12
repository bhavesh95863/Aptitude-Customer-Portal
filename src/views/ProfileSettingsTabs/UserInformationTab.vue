<template>
  <v-card light flat class="mx-auto">
    <v-card-title>User Information</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit" :disabled="submitStatus === 'PENDING'">
        <v-row>
          <v-col>
            <v-text-field
              label="Firstname"
              v-model="firstname"
              prepend-inner-icon="mdi-account-circle"
              :error-messages="firstnameErrors"
              required
              @input="$v.firstname.$touch()"
              @blur="$v.firstname.$touch()"
            />
          </v-col>
          <v-col>
            <v-text-field
              label="Lastname"
              v-model="lastname"
              prepend-inner-icon="mdi-account-circle"
              :error-messages="lastnameErrors"
              required
              @input="$v.lastname.$touch()"
              @blur="$v.lastname.$touch()"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="E-mail"
              :error-messages="emailErrors"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              v-model="email"
              prepend-inner-icon="mdi-email"
            />
          </v-col>
          <v-col>
            <v-text-field
              label="Phone"
              :error-messages="phoneErrors"
              v-model="phone"
              prepend-inner-icon="mdi-phone"
              @input="$v.phone.$touch()"
              @blur="$v.phone.$touch()"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="language"
              :items="languages"
              menu-props="auto"
              label="Language"
              prepend-inner-icon="mdi-earth"
              :error-messages="languageErrors"
              @input="$v.language.$touch()"
              @blur="$v.language.$touch()"
            ></v-select>
          </v-col>
          <v-col>
            <v-row>
              <span>Notifications</span>
              <v-checkbox v-model="smsNotification" label="SMS"></v-checkbox>
              <v-checkbox v-model="emailNotification" label="EMAIL"></v-checkbox>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-card-actions>
            <v-btn :disabled="submitStatus == 'PENDING'" type="submit">Save</v-btn>
            <v-btn @click="() => {this.assignFetchedValue()}">Cancle</v-btn>
          </v-card-actions>
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
  name: "UserInformationTab",
  data: () => ({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    language: "",
    languages: ["fr", "en", "hi"],
    emailNotification: 0,
    smsNotification: 0,
    submitStatus: null,
    fetched: {
      email: "",
      firstname: "",
      lastname: "",
      phone: "",
      language: "",
      emailNotification: 0,
      smsNotification: 0
    }
  }),
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    firstname: { required, maxLength: maxLength(10) },
    lastname: { required, maxLength: maxLength(10) },
    language: { required },
    phone: { required, numeric, minLength: minLength(7) }
  },
  computed: {
    ...mapGetters(["getCustomerEmail", "getLoggedIn"]),
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
    languageErrors() {
      const errors = [];
      if (!this.$v.language.$dirty) return errors;
      !this.$v.language.required && errors.push("Language is required");
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
    ...mapActions(["doRegister", "getUserInfo", "update"]),
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
        let userSubmitData = {
          email: this.email,
          first_name: this.firstname,
          last_name: this.lastname,
          phone: this.phone,
          language: this.language,
          email_notification: this.emailNotification ? 1 : 0,
          sms_notification: this.smsNotification ? 1 : 0
        };
        let userSubmitDataJson = JSON.stringify(userSubmitData);
        //call VuexAction for login
        setTimeout(() => {
          this.update(userSubmitDataJson)
            .then(() => {
              this.submitStatus = "DONE";
            })
            .catch(() => {
              this.submitStatus = "ERROR";
            });
        });
      }
    },
    getUserInfoData: function() {
      this.getUserInfo(this.getCustomerEmail).then(userData => {
        // console.log(userData);
        this.email = this.fetched.email = userData.email;
        this.firstname = this.fetched.firstname = userData.first_name;
        this.lastname = this.fetched.lastname = userData.last_name;
        this.phone = this.fetched.phone = userData.phone;
        this.language = this.fetched.language = userData.language;
        this.emailNotification = this.fetched.emailNotification =
          userData.email_notification;
        this.smsNotification = this.fetched.smsNotification =
          userData.sms_notification;
      });
    },
    assignFetchedValue: function() {
      this.email = this.fetched.email;
      this.firstname = this.fetched.firstname;
      this.lastname = this.fetched.lastname;
      this.phone = this.fetched.phone;
      this.language = this.fetched.language;
      this.emailNotification = this.fetched.emailNotification;
      this.smsNotification = this.fetched.smsNotification;
    }
  },
  created() {
    this.getUserInfoData();
  }
};
</script>