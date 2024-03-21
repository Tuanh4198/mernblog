import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import Nav from "./Nav";
import renderHTML from "react-render-html";

const SinglePost = (props) => {
  const [post, setPost] = useState("");
  const openedLink = useRef(false);

  const openLink = useCallback(
    (isUserEvent) => {
      if (post.productLink && !openedLink.current) {
        openedLink.current = isUserEvent;
        window.open(post.productLink, "_blank");
      }
    },
    [post]
  );

  useEffect(() => {
    if (!post) return;
    setTimeout(() => {
      if (openedLink.current) return;
      window.location = post.productLink;
    }, [30000]);
  }, [post]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => alert("Error"));
  }, []);

  const showSinglePost = () => (
    <div className="row">
      <div className="col-12 pt-3 pb-3">
        <h1>{post.title}</h1>
        <div className="lead pt-3">{renderHTML(post.content)}</div>
        <p>
          Author <span className="badge">{post.user}</span> Published on{" "}
          <span className="badge">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <div className="container pb-5" onClick={() => openLink(true)}>
      <Nav />
      {post && showSinglePost()}
    </div>
  );
};

export default SinglePost;
