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
        active: status
    };

    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result.message;
    }).catch(err => {
        return err;
    })
}