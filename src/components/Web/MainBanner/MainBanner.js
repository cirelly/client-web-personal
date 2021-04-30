import React from 'react'   
import Main from '../../../assets/img/png/home-v1.jpg'
import {Row, Col} from 'antd'
import './MainBaner.scss'


const MainBanner = () => {

    return (
        <div className="main-banner">
            <div className="main-banner__dark" />

            <Row>
                <Col lg={4} />
                <Col lg={16} >
                    <h2> Aprende nuevas <br /> tecnologias web y movil</h2>
                    <h3> A traves de cursos practicos, concisos y actualizados, creadors por <br />
                    profesionales con experiencia</h3>
                </Col>
                <Col lg={4}/>
            </Row>
        </div>
    )
}


export default MainBanner;