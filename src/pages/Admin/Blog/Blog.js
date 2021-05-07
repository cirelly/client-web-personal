import React,{useState, useEffect} from 'react'
import {notification, Button} from 'antd'
import Modal from '../../../components/Modal'
import {withRouter} from 'react-router-dom'
import queryString from 'query-string'
import {getPostApi} from '../../../api/post'
import PostList from '../../.../../../components/Admin/Blog/PostList';
import Pagination from '../../../components/Pagination'
import AddEditPostForm from '../../../components/Admin/Blog/AddEditPostForm'
import "./Blog.scss"    

const Blog = (props) => {
    
    const {location, history} = props;

    const [post, setPost] = useState(null);
    const [reloadPost, setReloadPost] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const {page=1} =queryString.parse(location.search)
    
    useEffect(() => {
       getPostApi(12, page).then(response=>{
           if(response?.code !== 200){
               notification["warning"]({
                   message: response.message
               })
           }else{
               setPost(response.posts)
           }
       }).catch(()=>{
           notification["error"]({
               message: "Server Error."
           })
       })
       setReloadPost(false)
    }, [page, reloadPost])

    const addPost = () => {
        setIsVisibleModal(true)
        setModalTitle("Create Post");
        setModalContent(<AddEditPostForm 
            post={null}
            setIsVisibleModal={setIsVisibleModal}
            setReloadPost={setReloadPost}
        />)
    
        
    }

    const editPost = post => {
        setIsVisibleModal(true)
        setModalTitle("Edit post");
        setModalContent(<AddEditPostForm 
            post={post}
            setIsVisibleModal={setIsVisibleModal}
            setReloadPost={setReloadPost}
        />)
    }

    if(!post){
        return null;
    }

    return (
       <div className="blog">
           <div className="blog__add-post">
                <Button type="primary" onClick={addPost}>
                    Create Post
                </Button>
           </div>
      
            <PostList setReloadPost={setReloadPost} posts={post} editPost={editPost} />
            
            <Pagination location={location} history={history} posts={post} />


           
            <Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal} width="75%">
               {modalContent}
           </Modal>

       </div>
    )
}

export default withRouter(Blog);
