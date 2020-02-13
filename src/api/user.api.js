// import config from 'config';
// import { authHeader } from '../helpers';
import axios from 'axios';
// import jsonApi from "@/openapi.json";
import jsonApi from "@/oldopenapi.json";
// import qs from 'querystring';
export const userApi = {
    login,
    getCurrentUser,
    logout,
    register,
    getCurrentUserRole,
    getUserInfo,
    update,
    changePassword,
    setContactDetailsApi,
    getContactDetailsApi,
    getUserGroupsApi,
    getOpenApifromApi
};

async function login(loginData) {
    let requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        withCredentials: true
    };
    return axios.post("http://localhost:8080/api/method/login", loginData, requestOptions)
        .then(user => {
            if (user.status == 200) {
                return user;
            }
        })
        .catch(function (response) {
            if (response.response.data.message) {
                return Promise.reject(response.response.data.message);
            } else {
                return Promise.reject("something went wrong, please try again");
            }
        });
}
function getCurrentUser() {
    let requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        withCredentials: true
    };
    return axios.get("http://localhost:8080/api/method/frappe.auth.get_logged_user", requestOptions)
        .then(response => { return response })
        .catch(function (response) {
            return handleResponse(response);
        })
}
function getCurrentUserRole() {
    let requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        withCredentials: true
    };
    return axios.get("http://localhost:8080/api/method/apptitude.api.get_role", requestOptions)
        .then(response => { return response })
        .catch(function (response) {
            return handleResponse(response);
        })
}

async function logout() {
    try {
        const response = await axios.get("http://localhost:8080/api/method/logout");
        return response;
    }
    catch (response_1) {
        return handleResponse(response_1);
    }
}

async function register(registerData) {
    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    return axios.post("http://localhost:8080/api/method/apptitude.api.register_user", registerData, requestOptions)
        .then(response => {
            if (response.data.message.status == 200) {
                return response.data.message;
            } else {
                return Promise.reject(response);
            }
        })
        .catch(function (error) {
            return handleResponse(error)
        });
}

async function setContactDetailsApi(contactData) {
    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    return axios.post("http://localhost:8080/api/method/apptitude.api.add_update_contact_details", contactData, requestOptions)
        .then(response => {
            if (response.data.message.status == 200) {
                return response.data.message;
            } else {
                return Promise.reject(response);
            }
        })
        .catch(function (error) {
            return handleResponse(error)
        });
}

async function getContactDetailsApi(contact_type) {
    let requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        withCredentials: true
    };
    return axios.get("http://localhost:8080/api/method/apptitude.api.get_contact_details?contact_type=" + contact_type, requestOptions)
        .then(response => { return response.data.message.data[0] })
        .catch(function (response) {
            return handleResponse(response);
        })
}

async function getUserInfo() {
    let requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    return axios.get("http://localhost:8080/api/method/apptitude.api.get_user_data", requestOptions)
        .then(response => {
            if (response.data.message.status == 200) {
                return response.data.message.data;
            } else {
                return Promise.reject(response);
            }
        })
        .catch(function (response) {
            return handleResponse(response);
        })
}

async function update(userSubmitDataJson) {
    let requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    return axios.put("http://localhost:8080/api/method/apptitude.api.update_profile", userSubmitDataJson, requestOptions)
        .then(response => {
            if (response.data.message.status == 200) {
                return response.data.message.data;
            } else {
                return Promise.reject(response);
            }
        })
        .catch(function (response) {
            return handleResponse(response);
        })
}

async function changePassword(passwordData) {
    let requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    return axios.put("http://localhost:8080/api/method/apptitude.api.change_password", passwordData, requestOptions)
        .then(response => {
            if (response.data.message.status == 200) {
                return response.data.message;
            } else {
                return Promise.reject(response);
            }
        })
        .catch(function (response) {
            return handleResponse(response);
        })
}

async function getUserGroupsApi() {
    let requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    return axios.get("http://localhost:8080/api/method/apptitude.api.get_user_information", requestOptions)
        .then(response => {
            if (response.data.message.status == 200) {
                return response.data.message.data;
            } else {
                return Promise.reject(response);
            }
        })
        .catch(function (response) {
            return handleResponse(response);
        })
}
async function getOpenApifromApi() {
    return jsonApi;
    // // return jsonApi;
    // let requestOptions = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     }
    // };

    // // api to get open api file
    // return axios.get("http://agw.aptitude.cloud/openapi.json", requestOptions)
    //     .then(response => {
    //         alert(response.openapi);
    //         return response;
    //     })
    //     .catch(function (response) {
    //         return handleResponse(response);
    //     })
}


// // prefixed function name with underscore because delete is a reserved word in javascript
// async function _delete(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };

//     const response = await fetch(`${config.apiUrl}/users/${id}`, requestOptions);
//     return handleResponse(response);
// }

// function handleResponse(response) {
//     return (response.data.message).then(message => {
//         const data = message && JSON.parse(message);
//         if (response.status != 200) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return error;
//             // return Promise.reject(error);
//         }

//         return data;
//     });
// }


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
