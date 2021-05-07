import React, {useState, useEffect} from 'react'
import {List, Spin, notification} from 'antd'
import {Link} from 'react-router-dom';
import moment from 'moment';
import QueryString from 'query-string'  
import Pagination from '../../../Pagination'
import {getPostApi} from '../../../../api/post'
import {Helmet} from "react-helmet";
import 'moment/locale/es';

import './PostListWeb.scss'

const PostListWeb = (props) => {

 
    const {location, history} = props;
    const [posts, setPosts] = useState(null)
    const {page = 1} = QueryString.parse(location.search);


    useEffect(() => {
    getPostApi(12, page).then(response => {
        if(response?.code !== 200){
            notification["warning"]({
                message: response.message
            })

        }else{
            setPosts(response.posts)
        }
    }).catch(()=>{
        notification["error"]({
            message: "Server Error"
        })
    })
    }, [page])

    if(!posts){
        return(
            <Spin tip="Cargando" style={{width: "100%", padding: "200px 0"}} />
        )
    }
    
    return (
        <>
        <Helmet>
            <title>Blog | Im Cirelly</title>
        </Helmet>
        <div className="post-list-web">
            <h1> Blog</h1>
            <List 
                dataSource={posts.docs} 
                renderItem={post => <Post  post={post} />} 
            />
            <Pagination 
                posts={posts}
                location={location}
                history={history}
            />
            </div>
            </>
    )
}

const Post = (props) => {

    const {post} = props;
    const day = moment(post.date).format("DD")
    const month = moment(post.date).format("MMM")


    return (
        <List.Item className="post">
            <div className="post__date">
                <span>{day}</span>
                <span>{month}</span>
            </div>

          
                <List.Item.Meta  title={  <Link to={`blog/${post.url}`}>{post.title} </Link>}/>
            
        </List.Item>
    )
}


export default PostListWeb
