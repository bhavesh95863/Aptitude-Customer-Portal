<template>
  <v-card width="400" class="mx-auto mt-10">
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit" :disabled="submitStatus === 'PENDING'">
        <v-text-field
          label="Username"
          :error-messages="usernameErrors"
          v-model="username"
          required
          prepend-inner-icon="mdi-account-circle"
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
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
        <v-card-actions>
          <v-btn :disabled="submitStatus == 'PENDING'" type="submit">Login</v-btn>
        </v-card-actions>
      </v-form>
      <!-- <div>{{submitStatus}}</div> -->
    </v-card-text>
  </v-card>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  name: "LoginPage",
  data: () => ({
    username: "",
    password: "",
    submitStatus: null
  }),
  mixins: [validationMixin],
  validations: {
    username: { required },
    password: { required }
  },
  computed: {
    ...mapGetters(["getCustomerEmail", "getLoggedIn"]),
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required.");
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
    ...mapActions(["doLogin"]),
    /**
     * Login form Submit
     */
    onSubmit(e) {
      //prevent from form submit
      if (this.submitStatus == "PENDING") {
        return;
      }
      this.submitStatus = "SUBMITTED";
      e.preventDefault();
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        return;
      } else {
        //create form data object
        const loginData = new FormData();
        loginData.append("usr", this.username);
        loginData.append("pwd", this.password);

        //call VuexAction for login
        setTimeout(() => {
          this.doLogin(loginData)
            .then(() => {
              this.submitStatus = "DONE";
            })
            .catch(() => {
              this.submitStatus = "ERROR";
            });
        });
      }
    }

    //     checkLogin(e) {
    //       e.preventDefault();

    //     const usr = this.username;
    //     const pwd = this.password;
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ usr, pwd })
    //     };
    //     // const requestOptions = { 'Authorization': 'token fdd5148fa663129:06aef6ad58d43ae' };

    //     // return fetch("http://demo.yopentech.com/api/method/login", requestOptions)
    //     // return fetch('http://localhost:8080/api/method/frappe.auth.get_logged_user', requestOptions)
    //         // .then(response => {response})
    //         // .then(response => {
    //             // login successful if there's a jwt token in the response
    //             // response
    //             // if (user.token) {
    //             //     // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             //     localStorage.setItem('user', JSON.stringify(user));
    //             // }
    //         // });
    // }
  }
};
</script>