import React from 'react'
import { Button} from 'antd'
import {Redirect} from 'react-router-dom'
import {PoweroffOutlined, MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import Logo from '../../../assets/img/png/logo.png'
import {logout} from '../../../api/auth'
import './MenuTop.scss'

export default function MenuTop(props){
    const {menuCollapsed, setMenuCollapsed} = props;
    const logoutUser = () => {
        logout();
        window.location.reload();
    }


    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <img className="menu-top__left-logo"
                src={Logo}
                alt=""
                />
                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
                {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }
                </Button>
            </div>
            <div  className="menu-top__right">
                <Button  type="link" onClick={logoutUser}>
                <PoweroffOutlined />
                </Button>

            </div>

        </div>
    )
}