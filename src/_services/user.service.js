// import config from 'config';

export const userService = {
    login,
    logout,
    register,
    // getAll,
    // getById,
    // update,
    // delete: _delete
};

// const API_HOST = 'http://localhost:8000';
// let _csrfToken = null;
// export async function getCsrfToken() {
//   if (_csrfToken === null) {
//     const response = await fetch(`${API_HOST}/csrf/`, {
//       credentials: 'include',
//     });
//     const data = await response.json();
//     _csrfToken = data.csrfToken;
//   }
//   return _csrfToken;
// }


async function login(email, password) {
    // const csrftoken =  await getCsrfToken();
    const axios = require('axios')

    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password })
    // };

    return   axios({
        method: 'post',
        url: `http://127.0.0.1:8000/api-token-auth/`,
        data: {
            "email": email, 
            "password": password, 
 
        },
        })
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            
            return user;
        });
}

export function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
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

    function register(user) {
        console.log(user);
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
            ...user
        });
        var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/rest-auth/registration/',
        headers: { 
            // 'Authorization': 'Basic YWRtaW5AZ21haWwuY29tOnJvb3Q=', 
            'Content-Type': 'application/x-www-form-urlencoded', 
            // 'Cookie': 'messages="5e3e593aa071122ff18f9bc0ba3e51ad9d52de8e$[[\\"__json_message\\"\\0540\\05425\\054\\"Successfully signed in as test@gmail.com.\\"]]"; csrftoken=sEouSLANTG7fkKXbzHl8kgkpWzMqIeL18etPJ3fEuXzYqaKWiMBgnnimD0WWKmj6; sessionid=l0n5ravup8zwjk1hy4x2goivex0j4nen'
        },
        data : data
        };

        return axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });


    // return axios({url : `http://127.0.0.1/rest-auth/registration/`, ...requestOptions}).then(handleResponse);
}

// function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }

function handleResponse(response) {
    console.log("response" , response);
    
    if (response.status !== 200){
        if(response.status === 401){
            logout()
            window.location.reload(true)
        }
        // const error = (data && data.message) ||response.statusText;
        return Promise.reject(response)
    }
    return response;


    // return response.text().then(text => {
    //     const data = text && JSON.parse(text);
    //     if (!response.ok) {
    //         if (response.status === 401) {
    //             // auto logout if 401 response returned from api
    //             logout();
    //             location.reload(true);
    //         }

    //         const error = (data && data.message) || response.statusText;
    //         return Promise.reject(error);
    //     }

    //     return data;
    // });
}