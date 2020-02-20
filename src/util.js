import Config from './config.js';


function getAuthHeader() {
    console.log('Bearer ' + localStorage.getItem('writToken'))
    return 'Bearer ' + localStorage.getItem('writToken');
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
                console.log("Setting writToken")
                localStorage.setItem('writToken', responseJson['auth_token']);
                resolve("Logged in.");
            }
            reject(responseJson['message']);
            // localStorage.setItem('itemName', value)
            // localStorage.getItem('itemName')
        })
    })
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
            console.log(responseJson)
            if (responseJson['status'] == 'success') {
                console.log("Setting writToken")
                localStorage.setItem('writToken', responseJson['auth_token']);
                resolve("Logged in.");
            }
            reject(responseJson['message']);
        })
    })
}


export const getWorks = function(){
    return new Promise((resolve, reject) => {
        console.log("FUCK THIS")
        fetch(Config.apiURL+ "/works", {
            method: 'get',
            headers: {
            'Authorization': getAuthHeader(),
            }
        })
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
            if (responseJson['status'] == 'success') {
                console.log("Setting writToken")
                localStorage.setItem('writToken', responseJson['auth_token']);
                resolve("Logged in.");
            }
            reject(responseJson['message']);
            // localStorage.setItem('itemName', value)
            // localStorage.getItem('itemName')
        })
    })
}