
import {basePath} from './config'


export function addNewsletterApi (email) {
    const url = `${basePath}/suscribe-newsletter/${email}`;
    const params = {
        method: "POST",
    };
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
       return err;
    })
}