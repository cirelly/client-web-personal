import React from 'react'

import {ReactComponent as Facebook} from "../../../assets/img/png/facebook.svg"
import {ReactComponent as Twitter} from "../../../assets/img/png/twitter.svg"
import {ReactComponent as LinkedIn} from "../../../assets/img/png/linkedin.svg"

import "./SocialLinks.scss"
const SocialLink = () => {

    return (
        <div className="social-links">
            <a href="https://www.facebook.com"
                className="facebook"
                target="_blank"
                rel="noopener noreferrer " >
                 <Facebook /> 
            </a>
            <a href="www.facebook.com"
                className="twitter"
                target="_blank"
                rel="noopener noreferrer " > 
                <Twitter /> 
            </a>
            <a href="www.facebook.com"
                className="linkedin"
                target="_blank"
                rel="noopener noreferrer " > 
                <LinkedIn /> 
            </a>
        </div>
    )
    
}

export default SocialLink;