// import config from 'config';
// import { authHeader } from '../helpers';
import axios from 'axios';

export const userApi = {
    login,
    getCurrentUser,
    logout,
    register,
    // getAll,
    // getById,
    // update,
    // delete: _delete
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
            handleResponse(response);
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
            handleResponse(response);
        })
}

async function logout() {
    try {
        const response = await axios.get("http://localhost:8080/api/method/logout");
        return response;
    }
    catch (response_1) {
        handleResponse(response_1);
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

// async function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     const response = await fetch(`${config.apiUrl}/users`, requestOptions);
//     return handleResponse(response);
// }


// async function getById(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     const response = await fetch(`${config.apiUrl}/users/${id}`, requestOptions);
//     return handleResponse(response);
// }

// async function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     const response = await fetch(`${config.apiUrl}/users/${user.id}`, requestOptions);
//     return handleResponse(response);
// }

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
        return Promise.reject("Something went wrong, please try again..");
    } else {
        if (error.data.message.message) {
            return Promise.reject(error.data.message.message);
        } else {
            return Promise.reject("Something went wrong, please try again.");
        }
    }
}