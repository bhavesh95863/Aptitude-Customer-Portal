import { userApi } from '../../api';
import { router } from '../../router';

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
    async doLogin({ dispatch, commit }, loginData) {
        userApi.login(loginData)
            .then(
                user => {
                    commit('setLogin', user.data);
                    dispatch('getCurrentUserRole');
                    router.push('/');
                }
            ).catch(
                (respone) => {
                    commit('loginFailure');
                    dispatch('error', respone, { root: true });
                }
            );
    },
    async getUsername({ dispatch, commit }) {
        return userApi.getCurrentUser()
            .then(response => {
                if (typeof response !== 'undefined' && response.status == 200) {
                    commit('autoLogin');
                    dispatch('getCurrentUserRole');
                    router.push('/');
                    return response
                }
            })
    },
    async getCurrentUserRole({ commit }) {
        return userApi.getCurrentUserRole()
            .then(response => {
                if (response.status == 200) {
                    commit('assignRole', response.data.message.data.role);
                    return response
                }
            })
    },
    async userLogout({ commit }) {
        return userApi.logout()
            .then(response => {
                if (response.status == 200) {
                    commit('logout');
                    router.push('/login');
                    return response
                }
            })
    },
    async setUserType({ commit }, UserType) {
        commit('setUserType', UserType);
    },
    async doRegister({ dispatch }, registerData) {
        return userApi.register(registerData)
            .then(
                respone => {
                    router.push('/login');
                    setTimeout(() => {
                        dispatch('success', respone.message, { root: true });
                    });
                    return respone;
                },
                error => {
                    dispatch('error', error, { root: true });
                    return Promise.reject(error);
                }
            );
    },
    async setContactDetails({ dispatch }, contactData) {
        return userApi.setContactDetailsApi(contactData)
            .then(
                respone => {
                    // router.push('/login');
                    setTimeout(() => {
                        dispatch('success', respone.message, { root: true });
                    });
                    return respone;
                },
                error => {
                    dispatch('error', error, { root: true });
                    return Promise.reject(error);
                }
            );
    },
    async getContactDetails({ dispatch }, contact_type) {
        return userApi.getContactDetailsApi(contact_type)
            .then(
                respone => {
                    return respone;
                },
                error => {
                    // router.push('/');
                    setTimeout(() => {
                        dispatch('error', error, { root: true });
                    });
                    return Promise.reject(error);
                }
            );
    },
    async getUserInfo({ dispatch }, id) {
        return userApi.getUserInfo(id)
            .then(
                respone => {
                    return respone;
                },
                error => {
                    router.push('/');
                    setTimeout(() => {
                        dispatch('error', error, { root: true });
                    });
                    return Promise.reject(error);
                }
            );
    },
    async getUserGroups({ dispatch }) {
        return userApi.getUserGroupsApi()
            .then(
                respone => {
                    return respone;
                },
                error => {
                    router.push('/');
                    setTimeout(() => {
                        dispatch('error', error, { root: true });
                    });
                    return Promise.reject(error);
                }
            );
    },
    async update({ dispatch }, userSubmitDataJson) {
        return userApi.update(userSubmitDataJson)
            .then(
                respone => {
                    router.push('/');
                    setTimeout(() => {
                        dispatch('success', "User Profile successfully updated!", { root: true });
                    });
                    return respone;
                },
                error => {
                    dispatch('error', error, { root: true });
                    return Promise.reject(error);
                }
            );
    },
    async changePassword({ dispatch }, passwordData) {
        return userApi.changePassword(passwordData)
            .then(
                respone => {
                    router.push('/');
                    setTimeout(() => {
                        dispatch('success', respone.message, { root: true });
                    });
                    return respone;
                },
                error => {
                    dispatch('error', error, { root: true });
                    return Promise.reject(error);
                }
            );
    },

};

const mutations = {
    setLogin: (state) => {
        state.customer_email = $cookies.get('user_id');
        state.logged_in = true;
        // state.user_type = 'Account User';
    },
    loginFailure: (state) => {
        state.customer_email = null;
        state.logged_in = false;
    },
    autoLogin: (state) => {
        state.customer_email = $cookies.get('user_id');
        state.logged_in = true;
        // state.user_type = 'Account User';
    },
    logout: (state) => {
        state.customer_email = null;
        state.logged_in = false;
    },
    setUserType: (state, UserType) => {
        state.user_type = UserType;
    },
    assignRole: (state, UserRole) => {
        // alert(UserRole);
        state.user_type = UserRole;
    },
};


export default {
    state,
    getters,
    actions,
    mutations
};