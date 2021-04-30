import React from 'react'
import {Row, Col, Card} from 'antd'
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
                <Col lg={4} />
                <Col lg={16}>
                    <Row className="row-cards">
                        <Col md={8}>

                        </Col>
                    </Row>
                </Col>
                <Col lg={4} />
           </Col>
       </Row>
    )
}



const CardInfo=(props)=>{
    const {icon, title, subtitle} = props;
    const {Meta} = Card;
}
export default HowMyCoursesWork;