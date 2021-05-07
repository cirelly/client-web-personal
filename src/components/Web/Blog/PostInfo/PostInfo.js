import React, { useEffect, useState } from "react";
import { Spin, notification } from "antd";
import { getPostUrlApi } from "../../../../api/post";
import moment from "moment";
import "./PostInfo.scss";
import {Helmet} from "react-helmet";
const PostInfo = (props) => {
  const { url } = props;
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPostUrlApi(url)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setPost(response.post);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Server Error.",
        });
      });
  }, [url]);
  if (!post) {
    return (
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
    );
  }
  return (
    <>
    <Helmet>
      <title> {post.title} | Im Cirelly</title>
    </Helmet>
    <div className="post-info">
      <h1 className="post-info__title">{post.title}</h1>
      <div className="post-info__date">
        {moment(post.date).local("es").format("LL")}
      </div>

      <div
        className="post-info__description"
        dangerouslySetInnerHTML={{ __html: post.description }}
      />
    </div>
    </>
  );
};

export default PostInfo;
