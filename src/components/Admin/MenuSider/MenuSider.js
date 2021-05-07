import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Layout, Menu} from 'antd'
import {HomeOutlined, UserOutlined,MenuOutlined, BookOutlined, MessageOutlined} from '@ant-design/icons'

import './MenuSider.scss'

function MenuSider(props){
    const {Sider} = Layout;
    const {menuCollapsed, location} = props;
    return (
        <div>
            <Sider className="admin-sider" collapsed={menuCollapsed} >
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
                    <Menu.Item key="/admin">
                        <Link to={"/admin"}>
                        <HomeOutlined />
                        <span className="nav-text">Home</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/users">
                        <Link to={"/admin/users"}>
                        <UserOutlined />
                        {/* {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> } */}
                        <span className="nav-text">Users</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/menu">
                        <Link to={"/admin/menu"}>
                        <MenuOutlined />
                        {/* {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> } */}
                        <span className="nav-text">Menu</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/courses">
                        <Link to={"/admin/courses"}>
                        <BookOutlined />
                        {/* {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> } */}
                        <span className="nav-text">Courses</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/blog">
                        <Link to={"/admin/blog"}>
                        <MessageOutlined />
                        {/* {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> } */}
                        <span className="nav-text">Blog</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        </div>
    )
}


export default withRouter(MenuSider);