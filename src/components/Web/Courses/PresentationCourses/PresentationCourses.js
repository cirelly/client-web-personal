import React from 'react'
import {Row, Col} from 'antd'
import AcademyLogo from '../../../../assets/img/png/academy-logo.png'

import './PresentationCourses.scss'
const PresentationCourses = () => {
    return (
        <div className="presentation-courses">
            <img src={AcademyLogo} alt="Cursos" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt, lectus ut viverra varius, erat felis vehicula nunc, nec volutpat urna orci ac enim. Nulla consectetur tincidunt quam et dapibus. In molestie mauris at mi auctor, ut tempus risus dapibus. Nunc ut pretium arcu. Duis viverra pharetra laoreet. Integer vel dolor eu orci pretium aliquam sed rutrum tortor. Suspendisse potenti. </p>
        </div>
    )
}

export default PresentationCourses
