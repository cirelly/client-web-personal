import React from 'react'

import {List, Button, Modal, notification} from 'antd'
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {Link} from 'react-router-dom';
import {deletePostApi} from '../../../../api/post';
import {getAccessToken} from '../../../../api/auth'
import "./PostList.scss"

const {confirm } = Modal;
const PostList = (props) => {


    const {posts, setReloadPost, editPost} = props;
    const deletePost = (post) => {
        const token = getAccessToken();
        confirm({
            title: "Delete Post",
            content: `Are you sure to delete the post: ${post.title}?`,
            okText: "Yes, delete", 
            okType: "danger",
            cancelText: "Cancel",
            onOk(){
                deletePostApi(token, post._id).then(response=>{
                    const typeNotification = response.code === 200 ? "success" : "warning"
                    notification[typeNotification]({
                        message: response.message
                    })
                    setReloadPost(true)
                }).catch(()=>{
                    notification["error"]({
                        message: "Server Error."
                    })
                })
            }

        })
    }
    return (
        <div className="post-list">
            <List 
            dataSource={posts.docs}
            renderItem={post=> <Post post={post} deletePost={deletePost} editPost={editPost} />}
            
            
            
            />
                
      
        </div>
    )
}

const Post = (props) => {

    const {post, deletePost, editPost} = props;

    
    return(
        <List.Item
        
        actions={[
            <Link
                to={`/blog/${post.url}`} target="_blank">
                <Button 
                    type="primary" 
                    target="_blank">
                    <EyeOutlined />
                </Button>
            </Link>,
            <Button
                type="primary"
                onClick={() => editPost(post)}
                >
                    <EditOutlined />
            </Button>,
            <Button
                type="danger"
                onClick={() => deletePost(post)}
                >
                    <DeleteOutlined />
            </Button>
        ]}
        >


        <List.Item.Meta title={post.title} />

        </List.Item>
    )
}

export default PostList
