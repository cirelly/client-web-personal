import React from 'react'
import {Row, Col} from 'antd'
import LogoWhite from '../../../../assets/img/png/logo.png'
import SocialLinks from '../../SocialLinks'
import './MyInfo.scss'

 const MyInfo = () => {
    return (
        <div className="my-info"> 
           <img src={LogoWhite} alt="Im Cirelly" />
           <h4>
               Entra en el mundo de desarrollo web y deja que tu imaginacion fluya con todos las nuevas tendencias en programacion.
           </h4>
           <SocialLinks />
        </div>
    )
}

export default MyInfo;
