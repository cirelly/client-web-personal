import React,{useEffect, useState} from 'react'
import {Row, Col, Spin, notification} from 'antd'
import {getCoursesApi} from '../api/courses'
import PresentationCourses from '../components/Web/Courses/PresentationCourses';
import CoursesList from '../components/Web/Courses/CoursesList'
import {Helmet} from 'react-helmet'
 const Courses = () => {

    const [courses, setCourses] = useState(null)
    useEffect(() => {
        getCoursesApi().then(response=> {
            if(response?.code !==200){
                notification["warning"]({
                    message: response.message
                })
            }else{
                setCourses(response.courses)
            }
        }).catch(()=>{
            notification["error"]({
                message: "Server Error."
            })
        })
    }, [])
    return (
        <>
        <Helmet>
            <title>Cursos de programacion | Im Cirelly</title>
            <meta name="description" content="Courses | Courses Im Cirelly" data-react-helmet="true"></meta>

        </Helmet>
        <Row className="courses">

            <Col md={4} />
            <Col md={16}>
                <PresentationCourses />


                {!courses ?
                (
                    <Spin 
                    tip="Cargando" style={{textAlign: "center", width: "100%", padding: "20px"}} />
                ) :

                    <CoursesList courses={courses} />
                }
                
            </Col>
            <Col md={4} />
            
        </Row>
        </>
    )
}
export default Courses;