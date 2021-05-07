import { basePath } from "./config";


export function getPostApi(limit, page) {
    const url = `${basePath}/get-post/?limit=${limit}&page=${page}`;
   
  
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

export function deletePostApi(token, id) {
    const url = `${basePath}/delete-post/${id}`;
    const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
      };

      return fetch(url, params)
        .then(response=> {
            return response.json();
        })
        .then(result=>{
            return result;
        })
        .catch(err=>{
            return err;
        }) 
}

export function addPostApi (token, data){
    const url = `${basePath}/add-post`;
    const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(data)
      };


      return fetch(url, params)
        .then(response=> {
            return response.json();
        })
        .then(result=>{
            return result;
        })
        .catch(err=>{
            return err;
        })
}

export function updatePostApi(token, id, data){
    const url = `${basePath}/update-post/${id}`;
    const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
       body: JSON.stringify(data)
      };
      return fetch(url, params)
        .then(response=> {
            return response.json();
        })
        .then(result=>{
            return result;
        })
        .catch(err=>{
            return err;
        })
}

export function getPostUrlApi(urlPost) {
  const url = `${basePath}/get-post/${urlPost}`;
 

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}