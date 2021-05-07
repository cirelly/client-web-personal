import React from 'react'
import {Pagination as PaginationAntd} from 'antd'
import "./Pagination.scss"



const Pagination = (props) => {

    const {posts, location, history} = props;
    const currentPage = parseInt(posts.page)
   

    const handlerPages = newPage => {
        history.push(`${location.pathname}?page=${newPage}`)

    }
    return (
        <PaginationAntd 
            defaultCurrent={currentPage}
            total={posts.totalDocs}
            pageSize={posts.limit}
            onChange={newPage => handlerPages(newPage)}
            className="pagination"
        
        />
    )
}





export default Pagination
