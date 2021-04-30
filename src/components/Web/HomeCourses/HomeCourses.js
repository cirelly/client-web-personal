import React from 'react'
import {Row, Col, Card, Button} from 'antd'
import {Link} from 'react-router-dom'
import reactJsHooks from '../../../assets/img/png/react-js-hooks.jpg'
import prestashop from '../../../assets/img/png/prestashop-1-7.jpg'
import reactNative from '../../../assets/img/png/react-native.jpg'
import javascript from '../../../assets/img/png/javascript-es6.jpg'
import wordpress from '../../../assets/img/png/wordpress.jpg'
import cssGrid from '../../../assets/img/png/css-grid.jpg'

import "./HomeCourses.scss";
const HomeCourses = () => {
    return (
        <Row className="home-courses">
            <Col lg={24} className="home-courses__title">
                <h2>Aprende y mejora tus habilidades</h2>
            </Col>
            <Col lg={4} />
            <Col lg={16}>
                <Row className="row-courses">
                    <Col md={6}>
                        <CardCourse  image={javascript} title="JavaScript" subtitle="Intermedio - JavaScript" link="https://facebook.com" />
                    </Col>
                    <Col md={6}>
                        <CardCourse  image={cssGrid} title="CSS GRID" subtitle="Intermedio - Css Grid" link="https://facebook.com" />
                    </Col>
                    <Col md={6}>
                        <CardCourse  image={reactJsHooks} title="JavaScript" subtitle="Intermedio - ReactJs/Hooks" link="https://facebook.com" />
                    </Col>
                    <Col md={6}>
                        <CardCourse  image={reactNative} title="JavaScript" subtitle="Basico - React Native" link="https://facebook.com" />
                    </Col>
                </Row>
                <Row className="row-courses">
                <Col md={6}>
                    <CardCourse  image={prestashop} title="JavaScript" subtitle="Basico - PrestaShop" link="https://facebook.com" />
                </Col>
                <Col md={6} />
                <Col md={6} />
                <Col md={6}>
                    <CardCourse  image={wordpress} title="JavaScript" subtitle="Basico - WordPress" link="https://facebook.com" />
                </Col>
                </Row>
            </Col>
            <Col lg={4} />
            <Col lg={24} className="home-courses__more">
                <Link to="/courses">
                    <Button>
                        Ver mas
                    </Button>
                </Link>


            </Col>
        </Row>
    )
}


const CardCourse = (props) => {
        const {image, title, subtitle, link} = props;
        const {Meta} = Card;
    return(
        <a href={link} target="_blank" rel="noopener noreferrer">
            <Card
            className="home-courses__card"
            cover={<img src={image} alt={title}/>}
            actions={[<Button>INGRESAR</Button>]}
            >
                <Meta title={title} description={subtitle} />
            </Card>
        </a>
    )
}


export default HomeCourses;