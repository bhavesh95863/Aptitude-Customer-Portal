import axios from 'axios';

const state = {
    customer_email: '',
    logged_in: false,

};
const getters = {
    getCustomerEmail: state => state.customer_email,
    getLoggedIn: state => state.logged_in
};
const actions = {
    async doLogin({ commit }, loginData){
        const response = await axios.post("http://localhost:8080/api/method/login", loginData, {
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            withCredentials: true
          });
        commit('setLogin', response.data);  
    }
};
const mutations = {
    setLogin: (state, data) => {
        state.customer_email =  data.full_name;
        state.logged_in = true;
    }
};


export default{
    state,
    getters,
    actions,
    mutations
};