import React from 'react'
import {Row, Col, Card, Icon} from 'antd'
import { ClockCircleOutlined, KeyOutlined,MessageOutlined, UserOutlined, DollarCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import "./HowMyCoursesWork.scss"
 const HowMyCoursesWork = () => {
    return (
       <Row className="how-my-courses-work">
           <Col lg={24} className="how-my-courses-work__title" >
            <h2>
                Como funcionan los cursos?
            </h2>
            <h3>
                Cada curso cuenta con contenido en la web de Udemy, activo
                las 24 horas del dia todos los dias.
            </h3>
            </Col>
                <Col lg={4} />
                <Col lg={16}>
                    <Row className="row-cards">
                        <Col md={8}>
                            <CardInfo icon={<ClockCircleOutlined />} title="Cursos y Clases" subtitle="Cursos de 10 y 30 horas de clases."/>
                        </Col>
                        <Col md={8}>
                            <CardInfo icon={<KeyOutlined />} title="Acceso 24/7" subtitle="Accede a los cursos en todo momento, cualquier dia"/>
                        </Col>
                        <Col md={8}>
                            <CardInfo icon={<MessageOutlined /> } title="Aprendizaje Colaborativo" subtitle="Aprende de los demas, dejando tus dudas a los profesores y amigos"/>
                        </Col>
                    </Row>
                    <Row className="row-cards">
                        <Col md={8}>
                            <CardInfo icon={<UserOutlined />} title="Mejora tu perfil" subtitle="Aprende y mejora tu perfil actualizando tus skills"/>
                        </Col>
                        <Col md={8}>
                            <CardInfo icon={<DollarCircleOutlined />} title="Precios bajos" subtitle="Aprendizaje al menor costo y mayor calidad"/>
                        </Col>
                        <Col md={8}>
                            <CardInfo icon={<CheckCircleOutlined /> } title="Certificado" subtitle="Certificate con estos curos y obten mayor reputacion"/>
                        </Col>
                    </Row>
                </Col>
                <Col lg={4} />
       
          
       </Row>
    )
}



const CardInfo=(props)=>{
    const {icon, title, subtitle} = props;
    const {Meta} = Card;

    return (
        <Card className="how-my-courses-work__card">
            {icon}
            <Meta title={title} description={subtitle} />
        </Card>
    )
}   
export default HowMyCoursesWork;