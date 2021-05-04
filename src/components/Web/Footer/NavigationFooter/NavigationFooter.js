import React from 'react'
import {Row, Col} from 'antd'
import { BookOutlined, ContactsOutlined,DatabaseOutlined, CopyrightOutlined, HddOutlined, AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import {Link} from 'react-router-dom'
import "./NavigationFooter.scss"


 const NavigationFooter = () => {
    return (
        <Row className="navigation">
           
            <Col lg={24}>
                <h3>Navegacion</h3>
            </Col>
            <Col md={12}>
                <RenderListLeft />
            </Col>
            <Col md={12}>
                <RenderListRight />
            </Col>
        </Row>
    )
}


const RenderListLeft = () => {


    return (
        <ul>
            <li>
                <a href="#" >
                <BookOutlined />
                Cursos Online
                </a>
            </li>
            <li>
                <Link to="/contact" >
                <ContactsOutlined />    
                    Contact
                </Link>
            </li>
            <li>
                <a href="#" >
                    <DatabaseOutlined />    
                    
                    Base de Datos
                </a >
            </li>
            <li>
                <a href="#" >
                <CopyrightOutlined />   
                    Politicas de privacidad
                </a>
            </li>
        </ul>
    )
}

const RenderListRight = () => {


    return (
        <ul>
            <li>
                <a href="#" >
                    <HddOutlined />
                    Sistemas / Servidores
                </a>
            </li>
            <li>
                <a href="#" >
                    <AppstoreOutlined />  
                    CMS
                </a>
            </li>
            <li>
                <a href="#" >
                    <UserOutlined />       
                    
                   Portafolio
                </a >
            </li>
            <li>
                <a href="#" >
                <CopyrightOutlined />   
                    Politicas de Cookies
                </a>
            </li>
        </ul>
    )
}
export default NavigationFooter;