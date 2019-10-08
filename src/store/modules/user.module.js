import { userApi } from '../../api';
import { router } from  '../../router';

const state = {
    customer_email: '',
    logged_in: false,
    user_type: ''
};
const getters = {
    getCustomerEmail: state => state.customer_email,
    getLoggedIn: state => state.logged_in,
    getUserType: state => state.user_type
};
const actions = {
    async doLogin({ dispatch, commit }, loginData){
        userApi.login(loginData)
        .then(
            user => {
                commit('setLogin', user.data);
                // dispatch('success', "Jay Bhavani", { root: true });                
                router.push('/');
            }
        ).catch(
            () => {
                commit('loginFailure');
                dispatch('error', "Incorrect Data", { root: true });
            }
        );
    },
    /**
     * Get Current Username
     */
    async getUsername({ dispatch,commit }) {
        return userApi.getCurrentUser()
        .then(response => { 
            if (typeof response !== 'undefined' && response.status == 200) {
                commit('autoLogin');
                router.push('/');
                return response
            }
        })
    },
    async userLogout({ commit }){
        return userApi.logout()
        .then(response => { 
            if(response.status == 200){
                commit('logout');
                router.push('/login');
                return response
            }
        })
    },
    async setUserType({ commit }, UserType){
        commit('setUserType', UserType);
    },
};

const mutations = {
    setLogin: (state, data) => {
        state.customer_email =  $cookies.get('user_id');
        state.logged_in = true;
        state.user_type = 'Account User';
    },
    loginFailure: (state) => {
        state.customer_email =  null;
        state.logged_in = false;
    },
    autoLogin: (state) => {
        state.customer_email =  $cookies.get('user_id');
        state.logged_in = true;
        state.user_type = 'Account User';
    },
    logout: (state) => {
        state.customer_email =  null;
        state.logged_in = false;
    },
    setUserType: (state, UserType) => {
        state.user_type =  UserType;
    },
};


export default{
    state,
    getters,
    actions,
    mutations
};