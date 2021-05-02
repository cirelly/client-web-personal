import React from 'react'
import {Row, Col, Card, Avatar} from 'antd'
import AvatarPersona from '../../../assets/img/png/no-avatar.png'
import "./ReviewsCourses.scss"
 const ReviewsCourses = () => {
    return (
        <Row className="reviews-courses"> 
            <Row>
                <Col lg={4} />
                <Col lg={16} className="reviews-courses__title" >
                    <h2>
                        Forma parte de los +35mil estudiantes que estan aprendiendo conmigo.
                    </h2>
                </Col>
                <Col lg={4} />
            </Row>
        
                <Col lg={4} />
                <Col lg={16}>
                    <Row className="row-cards">
                        <Col md={8}>
                            <CardReview avatar={AvatarPersona} name="Alonso Campos" subtitle="Alumno de udemy" review="Excelente curso"/>
                        </Col>
                        <Col md={8}>
                            <CardReview avatar={AvatarPersona} name="Jose guzman" subtitle="Alumno de udemy" review="Muy buen curso, recomendado"/>
                        </Col>
                        <Col md={8}>
                            <CardReview avatar={AvatarPersona} name="Maria Perez" subtitle="Alumno de udemy" review="Aprendi muchisimo de React, gracias"/>
                        </Col>
                    </Row>
                    <Row className="row-cards">
                        <Col md={8}>
                            <CardReview avatar={AvatarPersona} name="Mitchell Perone" subtitle="Alumno de udemy" review="Recomendado 100%, mas cursos de este contenido"/>
                        </Col>
                        <Col md={8}>
                            <CardReview avatar={AvatarPersona} name="Kevin Marcano" subtitle="Alumno de udemy" review="Mucha informacion, y gran contenido gracias"/>
                        </Col>
                        <Col md={8}>
                            <CardReview avatar={AvatarPersona} name="Tuti Fruti" subtitle="Alumno de udemy" review="Vale la pena este curso, recomendado"/>
                        </Col>
                    </Row>
                </Col>
                <Col lg={4} />
          
        </Row>
    )
}
const CardReview = (props) => {

    const {name, subtitle, avatar, review} = props;
    const {Meta} = Card;
    return(
        <Card className="reviews-courses__card">
            <p>{review}</p>
            <Meta avatar={<Avatar src={avatar} /> } title={name} description={subtitle}/>
        </Card>
    )
    
}

export default ReviewsCourses;


