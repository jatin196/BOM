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

let _csrfToken = null;
export async function getCsrfToken() {
const url = process.env.REACT_APP_AXIOS_URL;

  if (_csrfToken === null) {
    const response = await fetch(`${url}/csrf/`, {
      credentials: 'include',
    });
    const data = await response.json();
    _csrfToken = data.csrfToken;
  }
  return _csrfToken;
}


async function login(email, password) {
    // const csrftoken =  await getCsrfToken();
    const axios = require('axios')

    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password })
    // };
    const url = process.env.REACT_APP_AXIOS_URL;

    return   axios({
        method: 'post',
        url: `${url}/api-token-auth/`,
        data: {
            "email": email, 
            "password": password, 
 
        },
        })
        .then(handleResponse)
        .then(user => {
            console.log("setting user ", user);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            console.log(localStorage.getItem('user'));
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
const url = process.env.REACT_APP_AXIOS_URL;
    // const csrftoken =  await getCsrfToken();
    console.log(url);
    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({ ...user    });
    var config = {
      method: 'post',
      url: `${url}/rest-auth/registration/`,
      headers: { 
        // 'X-CSRFToken': 'TEieokx6yltFchpzagX1M2sPZmLRMCgesMR9wdgta35Xv8fd1EQAtLS9YUCsGL9a', 
        'Content-Type': 'application/x-www-form-urlencoded', 
        // 'Cookie': 'messages="600a5b1f839d50fece9972251fe6b648aea26140$[[\\"__json_message\\"\\0540\\05425\\054\\"Successfully signed in as testw4@gmail.com.\\"]]"; csrftoken=pf0b2KO8aYqIPbktgmjjcalDymII7W77RkfahVUDyIs1yngpmBfB2wXxcwCTTJmM; sessionid=8bjuzfggusjg4300d8rx4nkwnkxl9dn2'
      },
      data : data
    };
    console.log(config.url);
    
    return axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    

// return axios({url : `http://127.0.0.1/rest-auth/registration/`, ...requestOptions}).then(handleResponse);
}
// function register(user) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

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