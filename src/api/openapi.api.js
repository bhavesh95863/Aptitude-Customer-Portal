// import axios from 'axios';
// import jsonApi from "@/openapi.json";
// import jsonApi from "@/openapi_params.json";
import jsonApi from "@/openapi_aws.json";
// import qs from 'querystring';
export const openapi = {
    getOpenApifromApi
};

async function getOpenApifromApi() {
    return jsonApi;
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



// function handleResponse(error) {
//     if (error.response) {
//         return Promise.reject("Something went wrong, please try again.");
//     } else {
//         if (error.data.message.message) {
//             return Promise.reject(error.data.message.message);
//         } else {
//             return Promise.reject("Something went wrong, please try again.");
//         }
//     }
// }
