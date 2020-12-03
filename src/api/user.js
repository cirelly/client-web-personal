
import {basePath} from './config'

export function singUpApi(data){
    const url =  `${basePath}/signup`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    };
    return fetch(url, params)
    .then(response => {
        // console.log(response);
        return response.json();
    })
    .then(result => {
        if(result.user){
            return {
                ok: true,
                message: "User created successfully"
            }
        }
        return{
            ok: false,
            message: result.message
        } 
    }).catch(err =>{
        return {
            ok: false,
            message: err.message   
        }
    })
};

export function signInApi(data){
    const url = `${basePath}/signin`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }
    return fetch(url, params)
    .then(response =>{
        return response.json();
        // console.log(response);
    })
    .then(result =>{
        // console.log(result);
        return result;
    })
    .catch(err =>{
        console.log(err);
    })
};

export function getUsers(token){
    const url = `${basePath}/users`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    };
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        })
}

export function getUsersActive(token, status){
    const url = `${basePath}/users-active?active=${status}`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    };
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        })
}