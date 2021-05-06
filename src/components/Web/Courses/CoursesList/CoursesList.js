import React,{useState, useEffect} from 'react'
import {Row, Col,Button, notification, Rate, Card} from 'antd'
import {getCourseDataUdemyApi} from '../../../../api/courses'
import "./CoursesList.scss"



const CoursesList = (props) => {
    
    const{courses} = props;
    
    
    return (
        <div className="courses-list">
            <Row>
                {courses.map(course => (
                    <Col key={course._id} md={8} className="courses-list__course">
                        <Course  course={course} />

                    </Col>
                ))}
                
            </Row>
        </div>
    )
}


const Course = (props) => {

    const {course} = props;
    const [courseInfo, setCourseInfo] = useState({})
    const [urlCourse, setUrlCourse] = useState("");
    const {Meta} = Card;
    console.log(course);
    useEffect(() => {
        getCourseDataUdemyApi(course.idCourse).then(response=>{
            if(response?.code !==200){
                notification["warning"]({
                    message: response.message
                })
            }else{
                setCourseInfo(response.data);
                mountUrl(response.data.url)
            }
        }).catch(()=>{
            notification["error"]({
                message: "Server Error."
            })
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course])

    const mountUrl = url =>{
        if(!course.link){
            const baseUrl = `https://www.udemy.com${url}`
            const finalUrl = baseUrl + (course.coupon ? `?couponCode=${course.coupon}` : "");
            
            setUrlCourse(finalUrl);
        }else {
            setUrlCourse(course.link)
        }
    }

    return(
        <a href={urlCourse} target="_blank" rel="noopener noreferrer">
            
            
            <Card 
            cover={<img src={courseInfo.image_480x270} alt={courseInfo.title}/>}>
            <Meta
                title={courseInfo.title}
                description={courseInfo.headline}
            />
            <Button>
                Entrar en el curso
            </Button>
            <div className="courses-list__course-footer">
                <span>{course.price? `${course.price}` : courseInfo.price}</span>
                <div>
                    <Rate 
                        disabled
                        defaultValue={5}
                    
                    />
                </div>
            </div>
            </Card>


        </a>
        
    )
}

export default CoursesList
