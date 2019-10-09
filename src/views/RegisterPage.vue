<template>
  <v-card width="400" class="mx-auto mt-10">
    <v-card-title>Register Account</v-card-title>
    <v-card-text>
      <v-form @submit="onSubmit">
        <v-text-field label="Username" v-model="username" prepend-inner-icon="mdi-account-circle"/>
        <v-text-field label="Email" v-model="email" prepend-inner-icon="mdi-email"/>
        <v-text-field label="Firstname" v-model="firstname" prepend-inner-icon="mdi-account-circle"/>
        <v-text-field label="Lastname" v-model="lastname" prepend-inner-icon="mdi-account-circle"/>
        <v-text-field label="Passowrd" v-model="password" type="password" prepend-inner-icon="mdi-lock"/>
        <v-text-field label="Repeat Password " v-model="repassword" type="password" prepend-inner-icon="mdi-lock"/>
        <v-card-actions>
          <v-btn type="submit">Create</v-btn>  
        </v-card-actions> 
      </v-form>
    </v-card-text>
  </v-card>
</template>


<script>
import {mapActions, mapGetters} from 'vuex';
import {router} from '../router';

export default {
  name: 'RegisterPage',
  computed: mapGetters(['getCustomerEmail', 'getLoggedIn']),  
  data: () => ({
    username : '',
    email : '',
    firstname : '',
    lastname : '',
    password : '',
    repassword : '',
  }),
  methods :{
    ...mapActions(['doRegister']), 
    onSubmit(e) {
      //prevent from form submit
      e.preventDefault();

      //create form data object
      const registerData = new FormData();
      registerData.append('username', this.username);
      registerData.append('email', this.email);
      registerData.append('first_name', this.firstname);
      registerData.append('last_name', this.lastname);
      registerData.append('password', this.password);

      //call VuexAction for login
      this.doRegister(registerData);
    },
  }
}
</script>