import React from 'react'
import MainBanner from '../components/Web/MainBanner'
import HomeCourses from '../components/Web/HomeCourses'
import HowMyCoursesWork from '../components/Web/HowMyCoursesWork';
import ReviewsCourses from '../components/Web/ReviewsCourses'
import {Helmet} from "react-helmet";
export default function Home() {
    return (
        <>
        <Helmet>
          <title>Im Cirelly</title>
          <meta name="description" content="Home | Im Cirelly" data-react-helmet="true"></meta>
        </Helmet>
          <MainBanner />  
          <HomeCourses />
          <HowMyCoursesWork />
          <ReviewsCourses />
        </>
    )
}