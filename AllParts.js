import React from "react"

class AllParts extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            parts: []
        }
    }
    render(){
        <div>
            All parts
        </div>
    }
}

export default AllParts;
import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios'
export const userService = {
    login,
    logout,
    // register,
    // getAll,
    // getById,
    // update,
    // delete: _delete
};

// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     console.log("csrf cookie",  cookieValue);
//     return cookieValue;
// }

const API_HOST = 'http://localhost:8000';

let _csrfToken = null;

function getCsrfToken() {
    const axios = require('axios')
    const data = {}
    axios.defaults.headers.common['credentials'] = 'include'
  if (_csrfToken === null) {
    const response =  axios(`${API_HOST}/csrf`).then(res => {
        data=res
        console.log("data", data);
    });
    
    _csrfToken = data.csrfToken;
  }
  return _csrfToken;
}

function login(email, password) {
    const csrftoken =  getCsrfToken();

    // Request(
    //     /* URL */,
    //     {headers: {'X-CSRFToken': csrftoken}}
    // );
    // fetch(request, {
    //     method: 'POST',
    //     mode: 'same-origin'  // Do not send CSRF token to another domain.
    // }).then(function(response) {
    //     // ...
    // });
    const axios = require('axios')
//     axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'
console.log("csrf token");
    
    console.log("csrf token", csrftoken);
    axios({
        method: 'post',
        url: `http://127.0.0.1:8000/api-auth/login/`,
        headers: {
        //     "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, access-control-allow-credentials, Origin,Accept,HTTP_X_CSRFTOKEN, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",

        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Credentials": "true",
        //     "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "X-CSRFTOKEN": csrftoken,
            

        },
        data: {
            "email": email, 
            "password": password, 

        }
    }).then(handleResponse)
    .then(token => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', JSON.stringify(token));

    // axios.post(`http://127.0.0.1:8000/api-auth/login/`, { 
        // "email": email, 
        // "password": password, 
    //     "X-CSRFToken": csrf_token}).then(handleResponse)
    // .then(token => {
    //     // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     localStorage.setItem('token', JSON.stringify(token));

        return user;
    });
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password, csrftoken})
    // };

    // return fetch(`${config.apiUrl}/api-auth/login`, requestOptions)
        // .then(handleResponse)
        // .then(token => {
        //     // store user details and jwt token in local storage to keep user logged in between page refreshes
        //     localStorage.setItem('token', JSON.stringify(token));

        //     return user;
        // });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
}

// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }

// function getById(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }

// function register(user) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
// }

// function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
// }

// prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }

function handleResponse(response) {
    console.log("response" , response);
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}