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
          :error-messages="currentPasswordErrors"
          required
          @input="$v.currentPassword.$touch()"
          @blur="$v.currentPassword.$touch()"
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
          label="Repeat Password"
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
          <v-btn @click="() => {this.clearPasswordData()}">Cancle</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>

    <v-card-title>MFA Settings</v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="2">
            <v-text-field
              label="Mobile Device"
              v-model="mobileDevice"
              type="text"
              prepend-inner-icon="mdi-phone"
              :error-messages="mobileDeviceErrors"
              required
              @input="$v.mobileDevice.$touch()"
              @blur="$v.mobileDevice.$touch()"
            />
            <v-switch v-model="showMessages" label="Security Key"></v-switch>
            <v-switch v-model="showMessages" label="Mobile App"></v-switch>
            <v-card-actions>
              <v-btn type="submit">Submit</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "SecuritySettingsTab",
  data: () => ({
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
    submitStatus: null
  }),
  mixins: [validationMixin],
  validations: {
    currentPassword: { required, minLength: minLength(6) },
    newPassword: { required, minLength: minLength(6) },
    repeatPassword: { sameAsPassword: sameAs("newPassword") }
  },
  computed: {
    ...mapGetters(["getCustomerEmail", "getLoggedIn"]),
    currentPasswordErrors() {
      const errors = [];
      if (!this.$v.currentPassword.$dirty) return errors;
      !this.$v.currentPassword.minLength &&
        errors.push("Current Password must be at most 6 characters long");
      !this.$v.currentPassword.required &&
        errors.push("currentPassword is required.");
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
    ...mapActions(["changePassword"]),
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
        const passwordData = new FormData();
        // passwordData.append("username", this.username);
        // passwordData.append("email", this.email);
        // passwordData.append("first_name", this.firstname);
        // passwordData.append("last_name", this.lastname);
        passwordData.append("password", this.currentPassword);
        passwordData.append("new_password", this.newPassword);
        passwordData.append("conf_password", this.repeatPassword);

        //call VuexAction for login
        setTimeout(() => {
          this.changePassword(passwordData)
            .then(() => {
              this.submitStatus = "DONE";
            })
            .catch(() => {
              this.submitStatus = "ERROR";
            });
        });
      }
    },
    clearPasswordData() {
      this.currentPassword = "";
      this.newPassword = "";
      this.repeatPassword = "";
    }
  }
};
</script>