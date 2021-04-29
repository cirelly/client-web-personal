import React, {useState, useEffect} from 'react'
import {Menu} from "antd"
import {Link} from 'react-router-dom'
import logo from '../../../assets/img/png/logo.png'
import {getMenus} from '../../../api/menu'
import SocialLinks from '../SocialLinks'
import './MenuTop.scss'

const MenuTop = () => {

    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
       getMenus().then(response=>{
           const arrayMenu = [];
           response.menu.forEach(item => {
              item.active && arrayMenu.push(item)
           });
           setMenuData(arrayMenu);
       })

       
    }, [])
    console.log(menuData)
    return (
        <Menu className="menu-top-web" mode="horizontal"> 
            <Menu.Item className="menu-top-web__logo">
                <Link to="/" >
                    <img src={logo} alt="logo"/>
                </Link>
            </Menu.Item>

            {menuData.map(item => {
                const external = item.url.indexOf("http") > -1 ? true : false;
                if(external){
                    return(
                        <Menu.Item key={item._id} className="menu-top-web__item">
                            <a href={item.url} target="_blank" rel="noopener noreferrer"> {item.title}</a>
                        </Menu.Item>
                    )
                }
                return (
                    <Menu.Item key={item._id} className="menu-top-web__item">
                        <Link to={item.url}>{item.title}</Link>
                    </Menu.Item>
                )
            })}
           

            <SocialLinks />
        </Menu>
    )
}


export default MenuTop;