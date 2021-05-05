import React,{useState, useEffect} from 'react'
import {Form, Input, Button, notification} from 'antd'
import {
    KeyOutlined,
    DollarCircleFilled, GifOutlined, LinkOutlined
  } from "@ant-design/icons";
  import {addCourseApi, updateCourseApi} from '../../../api/courses'
import {getAccessToken}from "../../../api/auth"
import "./AddEditCourseForm.scss"


const AddEditCourseForm = (props) => {

    const {setIsVisibleModal, setReloadCourses, course} = props;

    const [courseData, setCourseData] = useState({})

    useEffect(() => {
       
       course && setCourseData(course)
    }, [course])


    const addCourse = (e) => {
        e.preventDefault();
        if(!courseData.idCourse){
            notification["error"]({
                message: "ID Course is required."
            })
        }else{
            const token = getAccessToken();

            addCourseApi(token, courseData)
                .then(response=>{
                    const typeNotification = response.code === 200 ? "success" : "warning";
                    notification[typeNotification]({
                        message: response.message
                    })
                    setIsVisibleModal(false)
                    setReloadCourses(true)
                    setCourseData({})

                })
                    .catch(() => {
                        notification["error"]({
                            message: "Server Error."
                        })
                    })
        }



        
    }

    const updateCourse = (e) => {
        e.preventDefault();
        const token = getAccessToken();
        updateCourseApi(token, course._id, courseData).then(response =>{
            const typeNotification = response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
                message: response.message
            })
            setIsVisibleModal(false)
            setReloadCourses(true)
            setCourseData({})
        }).catch(()=>{
            notification["error"]({
                message: "Server Error."
            })
        })

    }
    return (
        <div className="course-form">
            <AddEditForm
                addCourse={addCourse}
                updateCourse={updateCourse}
                courseData={courseData}
                setCourseData={setCourseData}
                course={course}
            
            />
        </div>
    )
}

const AddEditForm = (props) => {

    const {course, addCourse, updateCourse, setCourseData, courseData} = props;
    return(
        <Form className="add-edit-form" onSubmitCapture={course ? updateCourse : addCourse}>
            <Form.Item>
                <Input 
                    prefix={<KeyOutlined />}
                    placeholder="ID del curso"
                    value={courseData.idCourse}
                    onChange={e=> setCourseData({...courseData, idCourse: e.target.value})}
                    disabled={course ? true : false}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<LinkOutlined />}
                    placeholder="URL"
                    value={courseData.link}
                    onChange={e=> setCourseData({...courseData, link: e.target.value})}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<DollarCircleFilled />}
                    placeholder="Precio"
                    value={courseData.price}
                    onChange={e=> setCourseData({...courseData, price: e.target.value})}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<GifOutlined />}
                    placeholder="Cupon de Descuento"
                    value={courseData.coupon}
                    onChange={e=> setCourseData({...courseData, coupon: e.target.value})}
                />
            </Form.Item>
            
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                {course ? "Update" : "Create"}
                </Button>
            </Form.Item>
        </Form>
    )
}
export default AddEditCourseForm;