import React, {useState,useEffect, useRef} from 'react'

import {Form, Input, Button, Row, Col, DatePicker, notification} from 'antd';
import {FontSizeOutlined, LikeOutlined } from "@ant-design/icons";
import moment from 'moment'
import {getAccessToken} from '../../../../api/auth'
import {addPostApi, updatePostApi} from '../../../../api/post'
import {Editor} from '@tinymce/tinymce-react'
import "./AddEditPostForm.scss";

const AddEditPostForm = (props) => {
    
    const{post, setIsVisibleModal, setReloadPost} = props;
    const [postData, setPostData] = useState({});

    useEffect(() => {
      if(post){
          setPostData(post);
      }else{
          setPostData({})
      }
    }, [post])

    
    const processPost = e=>{
        e.preventDefault();

        const {title, url, description, date} = postData;
        if(!title || !url || !description || !date){
            notification["error"]({
                message: "All fields are requireds."
            })
        }else{
            if(!post){
               addPost();
            }else{
                updatePost();
            }
        }
      
    }

    const addPost = () => {
        const  token = getAccessToken();
        addPostApi(token, postData)
            .then(response=>{
                const typeNotification = response.code === 200 ? "success" : "warning";
                notification[typeNotification]({
                    message: response.message
                })
                setIsVisibleModal(false);
                setReloadPost(true);
                setPostData({})
            })
            .catch(()=>{
                notification["error"]({
                    message: "Server Error."
                })
            })
    }

    const updatePost = () => {
        const token = getAccessToken();
        updatePostApi(token, post._id, postData,)
            .then(response=>{
                const typeNotification = response.code === 200 ? "success" : "warning";
                notification[typeNotification]({
                    message: response.message
                })
                setIsVisibleModal(false);
                setReloadPost(true)
                setReloadPost({})
            })
            .catch(()=>{
                notification["error"]({
                    message: "Server Error"
                })
            })
    }
    return (
        <div className="post-form">
            <AddEditForm processPost={processPost} postData={postData} setPostData={setPostData} post={post}  />
        </div>
    )

}


const AddEditForm = (props) => {
    const editorRef = useRef(null);
    const {postData, setPostData, post, processPost } = props;
    return(
        <Form className="form" onSubmitCapture={processPost}> 
            <Row gutter={24}>
                <Col span={8}>
                    <Input 
                        prefix={<FontSizeOutlined />}
                        placeholder="Title"
                        value={postData.title}
                        onChange={e=> setPostData({...postData, title: e.target.value})}
                    />
                </Col>
                <Col span={8}>
                <Input 
                        prefix={<LikeOutlined />}
                        placeholder="Url"
                        value={postData.url}
                        onChange={e=> setPostData({...postData, url: transformTextUrl(e.target.value)})}
                    />
                </Col>
                <Col span={8}>
                    <DatePicker 
                    style={{width: "100%"}}
                    format="DD/MM/YYYY  HH:mm:ss"
                    placeholder="Date"
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss')}}
                    value={postData.date && moment(postData.date)}
                    onChange={(e, value) => 
                        setPostData(
                            {...postData,
                                date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString()})}
                     />
                </Col>
            </Row>
        
       <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         
         initialValue={postData.description ? postData.description : ""}
         onBlur={e=> setPostData({...postData, description: e.target.getContent()}) }
         init={{
           height: 350,
           menubar: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />
       {/* <button onClick={log}>Log editor content</button> */}
         <Button type="primary" htmlType="submit" className="btn-submit">
             {post ? "Update" : "Create"}
         </Button>
        </Form>
    )
}


const transformTextUrl = (text)=>{
    const url = text.replace(" ", "-");
    return url.toLowerCase();
}
export default AddEditPostForm;
