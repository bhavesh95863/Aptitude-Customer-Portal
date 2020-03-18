import axios from 'axios';
// import qs from 'querystring';
export const stripeApi = {
    createSubscriptionApi,
    syncCustomerCardApi,
    getPublicKeyApi,
    createSetupIntentApi,
    getStripeCustomerIdApi,
    getCustomerDataApi,
    getCardsDataApi,
    createBankAccountApi,
    getAccountsDataApi,
    deleteCustomerCardApi,
    deleteBankAccountApi
};

async function createSubscriptionApi(data) {
    // console.log(qs.stringify(data));
    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        // headers: {
        //     'Authorization': 'Bearer sk_test_LjTcfpPKfD8qX67Wk1rsf3JK',
        // create'bankTaccont': 'application/x-www-form-urlencoded',
        //     'Accept': '*/*'
        // }
    };
    // return axios.post("https://api.stripe.com/v1/customers", qs.stringify(data), requestOptions) 
    return axios.post("api/method/apptitude.api.create_subscription_account", data, requestOptions)
        .then(response => {
            return response;
        })
        .catch(function (error) {
            return handleResponse(error)
        });
}
async function syncCustomerCardApi(data) {
    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    // console.log(data);
    // console.log(customer_data);

    return axios.post("api/method/apptitude.api.sync_customer_card", data, requestOptions)
        .then(response => {
            return response;
        })
        .catch(function (error) {
            return handleResponse(error)
        });
}
async function createBankAccountApi(data) {
    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    // console.log(data);
    // console.log(customer_data);

    return axios.post("api/method/apptitude.api.create_bank_account", data, requestOptions)
        .then(response => {
            return response;
        })
        .catch(function (error) {
            return handleResponse(error)
        });
}
async function deleteCustomerCardApi(data) {
    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    // console.log(data);
    // console.log(customer_data);

    return axios.post("api/method/apptitude.api.detach_card", data, requestOptions)
        .then(response => {
            return response;
        })
        .catch(function (error) {
            return handleResponse(error)
        });
}
async function deleteBankAccountApi(data) {
    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    return axios.post("api/method/apptitude.api.delete_bank_account", data, requestOptions)
        .then(response => {
            return response;
        })
        .catch(function (error) {
            return handleResponse(error)
        });
}

async function getPublicKeyApi() {
    let requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    };
    return axios.get("api/method/apptitude.api.public_key", requestOptions)
        .then(response => {
            if (response.data.message.status == 200) {
                return response.data.message.data;
            } else {
                return Promise.reject(response);
            }
        })
        .catch(function (error) {
            return handleResponse(error)
        });
}
async function createSetupIntentApi() {
    let requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    };
    return axios.get("api/method/apptitude.api.create_setup_intent", requestOptions)
        .then(response => {
            return response.data.message;
        })
        .catch(function (error) {
            return handleResponse(error)
        });
}

async function getStripeCustomerIdApi() {
    let requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    };
    return axios.get("api/method/apptitude.api.get_stripe_customer_id", requestOptions)
        .then(response => {
            if (response.data.message.status == 200 && response.data.message.data == true) {
                return response.data.message.data;
            }
        })
        .catch(function (error) {
            return handleResponse(error)
        });
}
async function getCustomerDataApi() {
    let requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    };
    return axios.get("api/method/apptitude.api.get_customer", requestOptions)
        .then(response => {
            if (response.data.message.status == 200 && response.data.message.data.object == 'customer') {
                return response.data.message.data;
            }
        })
        .catch(function (error) {
            return handleResponse(error)
        });
}
async function getCardsDataApi() {
    let requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    };
    return axios.get("api/method/apptitude.api.get_card_details", requestOptions)
        .then(response => {
            if (response.data.message.status == 200) {
                return response.data.message.data;
            }
        })
        .catch(function (error) {
            return handleResponse(error)
        });
}
async function getAccountsDataApi() {
    let requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    };
    return axios.get("api/method/apptitude.api.get_account_details", requestOptions)
        .then(response => {
            if (response.data.message.status == 200) {
                return response.data.message.data;
            }
        })
        .catch(function (error) {
            return handleResponse(error)
        });
}


function handleResponse(error) {
    if (error.response) {
        return Promise.reject("Something went wrong, please try again.");
    } else {
        if (error.data.message.message) {
            return Promise.reject(error.data.message.message);
        } else {
            return Promise.reject("Something went wrong, please try again.");
        }
    }
}