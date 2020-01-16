import { stripeApi } from '../../api';
import { router } from '../../router';

const state = {

};
const getters = {

};
const actions = {

    async createSubscription({ dispatch }, data) {
        return stripeApi.createSubscriptionApi(data)
            .then(
                respone => {
                    router.push('/');
                    setTimeout(() => {
                        dispatch('success', "Subscription Account Created successfully!", { root: true });
                    });
                    return respone;
                },
                error => {
                    dispatch('error', error, { root: true });
                    return Promise.reject(error);
                }
            );
    },
    // async createSubscriptionCard({ dispatch }, data) {
    //     return stripeApi.createSubscriptionCardApi(data)
    //         .then(
    //             respone => {
    //                 router.push('/');
    //                 setTimeout(() => {
    //                     dispatch('success', "Subscription Card Created successfully!", { root: true });
    //                 });
    //                 return respone;
    //             },
    //             error => {
    //                 dispatch('error', error, { root: true });
    //                 return Promise.reject(error);
    //             }
    //         );
    // },
    async syncCustomerCard({ dispatch }, data) {
        return stripeApi.syncCustomerCardApi(data)
            .then(
                respone => {
                    router.push('/');
                    setTimeout(() => {
                        dispatch('success', "Subscription Card Created successfully!", { root: true });
                    });
                    return respone;
                },
                error => {
                    dispatch('error', error, { root: true });
                    return Promise.reject(error);
                }
            );
    },
    async createBankAccount({ dispatch }, data) {
        return stripeApi.createBankAccountApi(data)
            .then(
                respone => {
                    router.push('/');
                    setTimeout(() => {
                        dispatch('success', "Bank account Created successfully!", { root: true });
                    });
                    return respone;
                },
                error => {
                    dispatch('error', error, { root: true });
                    return Promise.reject(error);
                }
            );
    },
    async deleteCustomerCard({ dispatch }, data) {
        return stripeApi.deleteCustomerCardApi(data)
            .then(
                respone => {
                    router.push('/');
                    setTimeout(() => {
                        dispatch('success', "Card Deleted successfully!", { root: true });
                    });
                    return respone;
                },
                error => {
                    dispatch('error', error, { root: true });
                    return Promise.reject(error);
                }
            );
    },
    async getPublicKey({ dispatch }) {
        return stripeApi.getPublicKeyApi()
            .then(
                respone => {
                    return respone;
                },
                error => {
                    dispatch('error', error, { root: true });
                    return Promise.reject(error);
                }
            );
    },
    async get_stripe_customer_id({ dispatch }) {
        return stripeApi.getStripeCustomerIdApi()
            .then(
                respone => {
                    return respone;
                },
                error => {
                    dispatch('error', error, { root: true });
                    return Promise.reject(error);
                }
            );
    },
    async createSetupIntent({ dispatch }) {
        return stripeApi.createSetupIntentApi()
            .then(
                respone => {
                    return respone;
                },
                error => {
                    dispatch('error', error, { root: true });
                    return Promise.reject(error);
                }
            );
    },
    async getCustomerData({ dispatch }) {
        return stripeApi.getCustomerDataApi()
            .then(
                respone => {
                    return respone;
                },
                error => {
                    dispatch('error', error, { root: true });
                    return Promise.reject(error);
                }
            );
    },
    async getCardsData({ dispatch }) {
        return stripeApi.getCardsDataApi()
            .then(
                respone => {
                    return respone;
                },
                error => {
                    return Promise.reject(error);
                }
            );
    },
    async getAccountsData({ dispatch }) {
        return stripeApi.getAccountsDataApi()
            .then(
                respone => {
                    return respone;
                },
                error => {
                    return Promise.reject(error);
                }
            );
    },


};

const mutations = {

};


export default {
    state,
    getters,
    actions,
    mutations
};