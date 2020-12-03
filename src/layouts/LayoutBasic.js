import React from 'react'
import {Layout} from 'antd'
import {Route, Switch} from 'react-router-dom'
import './LayoutBasic.scss'

export default function LayoutBasic(props){
    const {routes} = props;
    const {Content, Footer} = Layout;

    return (
        <Layout>
            <h2>Menu Sider User Basic</h2>
            <Layout>
                <Content>
                    <LoadRoutes routes={routes} />
                </Content>
                <Footer>
                    footer
                </Footer>
            </Layout>
        </Layout>
    )
}

function LoadRoutes({routes}){
    return(
    <Switch>
        {routes.map((routes, index) => (
        <Route 
        key={index}
        path={routes.path}
        component={routes.component}
        exact={routes.exact}
        />
    ))}
    </Switch>



    ) 
}