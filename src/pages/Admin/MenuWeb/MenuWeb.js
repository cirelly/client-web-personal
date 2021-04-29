import React, {useState, useEffect} from 'react'
import {getMenus} from '../../../api/menu'
import MenuWebList from '../../../components/Admin/MenuWeb/MenuWebList'

export default function MenuWeb(){

    const [menu, setMenu] = useState([]);
    const [reloadMenuWeb, setreloadMenuWeb] = useState(false);
    console.log(menu);
    useEffect(() => {
        getMenus().then(response=>{
            setMenu(response.menu)
        })
        setreloadMenuWeb(false)
    }, [reloadMenuWeb])

    return(
        <div className='menu-web'>
            <h1>MenuWeb</h1>
            <MenuWebList menu={menu} setreloadMenuWeb={setreloadMenuWeb}/>
        </div>
    )
}