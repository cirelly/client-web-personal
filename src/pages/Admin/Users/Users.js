import React, {useState, useEffect} from 'react'
import {getAccessToken} from '../../../api/auth'
import {getUsersActive} from '../../../api/user'
import ListUsers from '../../../components/Admin/Users/ListUsers'
import './Users.scss'

export default function Users(){
    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const token = getAccessToken();
    
    useEffect(()=> {
        getUsersActive(token, true)
        .then(response => setUsersActive(response.users));
        getUsersActive(token, false)
        .then(response => setUsersInactive(response.users))
    }, [token])
    return(
        <div>
            <ListUsers usersActive={usersActive} usersInactive={usersInactive}/>
        </div>
    )
}