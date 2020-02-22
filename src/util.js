import Config from './config.js';


function getAuthToken() {
    return localStorage.getItem('writToken');
}

function getAuthQueryString() {
    return "?token=" + getAuthToken()
}


export const loginAction = function(email, password){
    return new Promise((resolve, reject) => {
        fetch(Config.apiURL+ "/auth/login", {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        })
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
            if (responseJson['status'] == 'success') {
                localStorage.setItem('writToken', responseJson['auth_token']);
                resolve("Logged in.");
            }
            reject(responseJson['message']);
            // localStorage.setItem('itemName', value)
            // localStorage.getItem('itemName')
        })
    })
}

export const logoutAction = function(){
    localStorage.removeItem("writToken")
    return true
}

export const registerAction = function(email, password){
    return new Promise((resolve, reject) => {
        fetch(Config.apiURL+ "/auth/register", {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson['status'] == 'success') {
                localStorage.setItem('writToken', responseJson['auth_token']);
                resolve("Logged in.");
            }
            reject(responseJson['message']);
        })
    })
}

export const checkAuth = function(){
    return new Promise((resolve, reject) => {
        fetch(Config.apiURL+ "/auth/status", {
            headers: {
                'Authorization': 'Bearer '+ getAuthToken()
            }
        })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson['status'] == 'success') {
                resolve(true)
            } else {
                resolve(false)
            }
            
        })
        .catch((error) => {
            reject(error)
        })
    })
}


export const getWorks = function(){
    return new Promise((resolve, reject) => {
        fetch(Config.apiURL+ "/works"+getAuthQueryString())
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson['status'] == 'success') {
                resolve(responseJson.data)
            } else {
                reject(responseJson['message'])
            }
            
        })
    })
}


export const makeWork = function(){
    return new Promise((resolve, reject) => {
        fetch(Config.apiURL + "/works"+getAuthQueryString(), {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: getAuthToken()
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson['data'])
        })
        .catch((error) => {
            reject(error)
        })
    })
}