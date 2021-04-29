import {basePath} from './config'


export function getMenus(){
    const url = `${basePath}/get-menus`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
           
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

export function updateMenuOrderApi(token, menuId, data){
    const url = `${basePath}/update-menu/${menuId}`;
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(data)
    };
    return fetch(url, params).then(response=> {
        return response.json();
    }).then(result=> {
        return result.message;
    }).catch(err=>{
        return err;
    })
}


export function activateMenuApi(token, menuId, status){
   
    const url = `${basePath}/activate-menu/${menuId}`;
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({active: status})
    };

    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result.message;
    }).catch(err => {
        console.log(err);
    })
}

export function addMenuApi (token, menu){
    const url = `${basePath}/add-menu`;
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(menu)
    };

    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result.message;
    }).catch(err => {
        console.log(err);
    })
}


export function deleteMenuApi (token, menuId) {
    const url = `${basePath}/delete-menu/${menuId}`
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