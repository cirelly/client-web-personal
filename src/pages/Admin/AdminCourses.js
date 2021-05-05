import React,{useState, useEffect} from 'react'
import {getCoursesApi} from '../../api/courses'

import CoursesList from '../../components/Admin/CoursesList'
 const AdminCourses = () => {
     const [courses, setCourses] = useState([])
     const [reloadCourses, setReloadCourses] = useState(false);

     useEffect(() => {
         getCoursesApi().then(response=> {
             setCourses(response.courses)
         })
         setReloadCourses(false)
     }, [reloadCourses])

    return (
        <div className="courses">
            <CoursesList courses={courses} setReloadCourses={setReloadCourses} />
        </div>
    )
}
export default AdminCourses;