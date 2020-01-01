import axios from 'axios';
export const stripeApi = {
    createSubscriptionApi,
    createSubscriptionCardApi,
    getPublicKeyApi,
    createSetupIntentApi
};

async function createSubscriptionApi(data) {
    let requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer sk_test_LjTcfpPKfD8qX67Wk1rsf3JK',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
        }
    };
    return axios.post("https://api.stripe.com/v1/customers", qs.stringify(data), requestOptions)
        .then(response => {
            return response;
        })
        .catch(function (error) {
            return handleResponse(error)
        });
}
async function createSubscriptionCardApi(data) {
    let requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer sk_test_LjTcfpPKfD8qX67Wk1rsf3JK',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
        }
    };
    // console.log(data);
    // console.log(customer_data);

    return axios.post("https://api.stripe.com/v1/customers/" + 'cus_GNtXzGqlQ2vYBK' + "/sources", qs.stringify(data), requestOptions)
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
    return axios.get("http://localhost:8080/api/method/apptitude.api.public_key", requestOptions)
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
    return axios.get("http://localhost:8080/api/method/apptitude.api.create_setup_intent", requestOptions)
        .then(response => {
            return response.data.message;
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