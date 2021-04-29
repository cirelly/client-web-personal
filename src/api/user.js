
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

export function uploadAvatarApi(token, avatar, userId){
    const url = `${basePath}/upload-avatar/${userId}`;
    const formData = new FormData();
    formData.append("avatar", avatar, avatar.name);

    const params = {
        method: "PUT",
        body: formData,
        headers: {
            Authorization: token
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err.message;
    })
}


export function getAvatarApi(avatarName){
    const url = `${basePath}/get-avatar/${avatarName}`;

    return fetch(url).then(response => {
        return response.url;

    }).catch(err => {
        return err.message;
    })

}

export function updateUserApi(token, user, userId){
    const url = `${basePath}/update-user/${userId}`;
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(user)
    }
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;

    }).catch(err => {
        return err.message;
    })
}

export function activateUserApi(token, userId, status){
    const url = `${basePath}/activate-user/${userId}`
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({
            active: status
        })
    }
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result=>{
        return result.message;
    }).catch(err=> {
        return err.message
    })
}

export function deleteUserApi(token, userId){
    const url = `${basePath}/delete-user/${userId}`
    const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
    }
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result=> {
       return result.message; 
    }).catch(err=>{
        return err.message;
    })
}

export function createUserApi(token, user){
    const url = `${basePath}/create-user`

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(user)
    }

    return fetch(url, params).then(response=>{
        return response.json();
    }).then(result=>{
        return result.message;
    }).catch(err=>{
        return err.message;
    })
}