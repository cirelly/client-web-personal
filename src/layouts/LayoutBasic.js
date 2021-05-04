import React from 'react'
import {Layout, Row, Col} from 'antd'
import {Route, Switch} from 'react-router-dom'
import './LayoutBasic.scss'
import MenuTop from '../components/Web/MenuTop'
import Footer  from '../components/Web/Footer'


export default function LayoutBasic(props){
    const {routes} = props;
    const {Content, } = Layout;


    return (
        <>
        <Row>
            <Col md={4} />
            <Col md={16}>
                <MenuTop />   
            </Col>
            <Col md={4} />
        </Row>
        <LoadRoutes routes={routes} />
              <Footer />  
       
        </>
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