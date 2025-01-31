import React from 'react'


import {Row, Col} from 'antd'
import {useParams, withRouter} from 'react-router-dom';
import PostListWeb from '../components/Web/Blog/PostListWeb'
import PostInfo from '../components/Web/Blog/PostInfo'
const Blog = (props) => {
    const {location, history} = props; 
    const {url} = useParams()
    
   
    return (
        <Row>
            <Col md={4} />
            <Col md={16} >
                {url ? 
                    (
                        <PostInfo url={url}/>
                    )
                    :
                    (
                        <PostListWeb location={location} history={history} />
                    )
                }

            </Col>
            <Col md={4} />
        </Row>
  
  
  
  
  )
}

export default Blog
