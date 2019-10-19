<template>
  <v-card light flat class="mx-auto">
    <v-card-title>User Information</v-card-title>
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
        <v-select
          v-model="language"
          :items="languages"
          menu-props="auto"
          label="Language"
          prepend-inner-icon="mdi-earth"
          :error-messages="languageErrors"
          @input="$v.language.$touch()"
          @blur="$v.language.$touch()"
        >
          <list-item>okok</list-item>
        </v-select>
        <v-row>
          <header prepend-inner-icon="mdi-bell">Notification</header>
          <v-checkbox v-model="smsNotification" label="SMS"></v-checkbox>
          <v-checkbox v-model="emailNotification" label="EMAIL"></v-checkbox>
        </v-row>
        <v-card-actions>
          <v-btn :disabled="submitStatus == 'PENDING'" type="submit">Save</v-btn>
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
    submitStatus: null
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
        //create form data object
        const registerData = new FormData();
        // registerData.append("email", this.email);
        // registerData.append("first_name", this.firstname);
        // registerData.append("last_name", this.lastname);
        // registerData.append("phone", this.phone);
        // registerData.append("language", this.language);
        let userSubmitData = {
          email: this.email,
          first_name: this.firstname,
          last_name: this.lastname,
          phone: this.phone,
          language: this.language,
          email_notification: this.emailNotification,
          sms_notification: this.smsNotification
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
    }
  },
  created() {
    this.getUserInfo(this.getCustomerEmail).then(userData => {
      // console.log(userData);
      this.email = userData.email;
      this.firstname = userData.first_name;
      this.lastname = userData.last_name;
      this.phone = userData.phone;
      this.language = userData.language;
      this.emailNotification = userData.email_notification;
      this.smsNotification = userData.sms_notification;
    });
  }
};
</script>