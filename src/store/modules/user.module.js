import { userApi } from '../../api';

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
        const response = userApi.login(loginData);
        if(response.status == 200){
            commit('setLogin', response.data);
        }
    },
    async checkLogin(){

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