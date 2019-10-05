<template>
  <v-card width="400" class="mx-auto mt-10">
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-form @submit="onSubmit">
        <v-text-field label="Username" v-model="username" prepend-inner-icon="mdi-account-circle"/>
        <v-text-field label="Passowrd" v-model="password" type="password" prepend-inner-icon="mdi-lock"/>
        <v-card-actions>
          <v-btn type="submit">Login</v-btn>  
        </v-card-actions> 
      </v-form>
    </v-card-text>
    
  </v-card>
</template>


<script>
import axios from 'axios';
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';

export default {
  name: 'Login',
  computed: mapGetters(['getCustomerEmail', 'getLoggedIn']),  
  data: () => ({
    username : '',
    password : ''
  }),
  created: () =>({
    if(getLoggedIn){
      router.push('/');
    }
  }),
  methods :{
    ...mapActions(['doLogin']),
    onSubmit(e) {
      e.preventDefault();
      const loginData = new FormData();
      loginData.append('usr', this.username);
      loginData.append('pwd', this.password);
      this.doLogin(loginData);
      
    },
    getUsername() {
      axios.get("http://localhost:8080/api/method/frappe.auth.get_logged_user", {
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'set-cookie': ''
        },
        withCredentials: true
      })
      .then(response => {response})
      .catch(e => {
        e
      })
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
}
</script>