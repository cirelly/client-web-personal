import React, {useState} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Layout} from 'antd'
import './LayoutAdmin.scss'
import MenuTop from '../components/Admin/MenuTop'
import MenuSider from '../components/Admin/MenuSider'
import AdminSignIn from '../pages/Admin/SignIn'
import useAuth from '../hooks/useAuth'
import {getAccessToken, getRefreshToken} from '../api/auth'


export default function LayoutAdmin(props){
    
    const { routes } = props;
    const [ menuCollapsed, setMenuCollapsed ] = useState(false);
    const {Content, Header, Footer} = Layout;
    const {user, isLoading} = useAuth();

    if(!user && !isLoading){
        return (
            <>
            <Redirect to="/admin/login" />,
            <Route path="/admin/login" component={AdminSignIn} />
            </>
        )
    }
    if(user && !isLoading){
    return (
        <Layout>
           <MenuSider menuCollapsed={menuCollapsed} />
            <Layout className="layout-admin" style={{marginLeft: menuCollapsed ? "80px" : "200px"}}>
                <Header className="layout-admin__header">
                    <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
                </Header>
                <Content className="layout-admin__content">
                    <LoadRoutes routes={routes} />
                </Content>
                <Footer className="layout-admin__footer">
                    Footer
                </Footer>
            </Layout>
        </Layout>
        );
    }
    return null;
}

function LoadRoutes({routes}){
    
    return (
        <Switch>
            
    {routes.map((route, index) => (
        <Route 
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.component}
        />
    ))}
        </Switch>
    );
}