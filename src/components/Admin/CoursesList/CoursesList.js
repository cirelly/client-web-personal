import React,{useEffect, useState} from 'react'
import {List, Modal as ModalAntd, notification, Button} from 'antd'
import {getCourseDataUdemyApi, deleteCourseApi, updateCourseApi} from '../../../api/courses'
import {getAccessToken} from '../../../api/auth'
import ReactDragSortableList from 'react-drag-sortable'
import {
    EditOutlined,
    DeleteOutlined,
    UserDeleteOutlined,
    CheckOutlined,
  } from "@ant-design/icons";

import AddEditCourseForm from '../AddEditCourseForm'
import Modal from '../../Modal'
import "./CoursesList.scss"
 const CoursesList = (props) => {

    const {confirm} = ModalAntd;
    const [listCourses, setListCourses] = useState([])
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null)
    const {courses, setReloadCourses} = props;
    const onSort = (sortedList, dropEvenet) => {
        const token = getAccessToken();

        sortedList.forEach(item => {
            const {_id } = item.content.props.course;
            const order = item.rank;
            updateCourseApi(token, _id, {order});
        })


    }

    useEffect(() => {
        const listCoursesArray = [];
        courses.forEach(element => {
            listCoursesArray.push({
                content: (
                    <Course course={element} deleteCourse={deleteCourse} updateCourseModal={updateCourseModal}/>
                )
            })
           
        });
        setListCourses(listCoursesArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courses])


    const deleteCourse = (course) =>{
        const token = getAccessToken();
        confirm({
            title: "Delete Course",
            content:` Are you sure to delete course: ${course.idCourse}?`,
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk(){
                deleteCourseApi(token, course._id)
                    .then(response=>{
                        const typeNotification = response.code === 200? "success" : "warning"
                        notification[typeNotification]({
                            message: response.message
                        });
                        setReloadCourses(true)
                    })
                    .catch(()=>{
                       notification["error"]({
                           message: "Server Error"
                       })     
                    })
            }
        })
    }

    const addCourseModal = () =>{
        setIsVisibleModal(true);
        setModalTitle("Create Course");
        setModalContent(<AddEditCourseForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadCourses={setReloadCourses}
            
            />)
    } 
    const updateCourseModal = (course) => {
        setIsVisibleModal(true);
        setModalTitle("Update Course");
        setModalContent(<AddEditCourseForm
                course={course}
                setIsVisibleModal={setIsVisibleModal}
                setReloadCourses={setReloadCourses}
            
            />)
    }
    return (
        <div className="courses-list">
           <div className="courses-list__header">
                <Button type="primary" onClick={()=>addCourseModal() }>
                    Create Course
                </Button>
           </div>

           <div className="courses-list__items">
            {listCourses.length === 0 && (
                <h2 style={{textAlign: 'center', margin: 0}}>
                    No tienes cursos creados</h2>
            )}
            <ReactDragSortableList items={listCourses} onSort={onSort} type="vertical"/>
           </div>

        </div>
    )
}


function Course (props){

    const {course, deleteCourse, updateCourseModal} = props;
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
         getCourseDataUdemyApi(course.idCourse).then(response=> {
            if(response.code !== 200){
                notification["warning"]({
                    message: `Course with id:  ${course.idCourse} not found.`
                })
            }
            setCourseData(response.data)
        });
    }, [course]);

    if(!courseData){
        return null;
    }
    return(
        <List.Item
        actions={[
            <Button type="primary" onClick={()=> updateCourseModal(course)}>
                <EditOutlined />
            </Button>,
            <Button type="danger" onClick={()=> deleteCourse(course)}>
                <DeleteOutlined />
            </Button>
        ]}>
            <img 
                src={courseData.image_480x270} 
                alt={courseData.title} 
                style={{width: "100px", marginRight: "20px"}}
            />
            <List.Item.Meta 
                title={`${courseData.title} | ID: ${course.idCourse}`}
                description={courseData.headline}
            />
        </List.Item>
    ) 
}
export default CoursesList;
