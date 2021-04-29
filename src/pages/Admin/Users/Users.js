import React, {useState, useEffect} from 'react'
import {getAccessToken} from '../../../api/auth'
import {getUsersActive} from '../../../api/user'
import ListUsers from '../../../components/Admin/Users/ListUsers'
import './Users.scss'

export default function Users(){
    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const token = getAccessToken();
    const [reloadUsers, setReloadUsers] = useState(false)
    useEffect(()=> {
        getUsersActive(token, true)
        .then(response => setUsersActive(response.users));
        getUsersActive(token, false)
        .then(response => setUsersInactive(response.users));
        setReloadUsers(false)
    }, [token, reloadUsers])
    return(
        <div>
            <ListUsers usersActive={usersActive} setReloadUsers={setReloadUsers} usersInactive={usersInactive}/>
        </div>
    )
}