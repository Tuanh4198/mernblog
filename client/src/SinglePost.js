import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Nav from "./Nav";
import renderHTML from "react-render-html";

const SinglePost = (props) => {
  const [post, setPost] = useState("");
  const [openedLink, setOpenedLink] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((response) => setPost(response.data))
      .catch((error) => alert("Error"));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      openLink(true);
    });
    setInterval(() => {
      openLink(false);
    }, [10000]);
  }, [openLink]);

  const openLink = useCallback(
    (isUserEvent) => {
      if (post.productLink && !openedLink) {
        window.open(post.productLink, "_blank");
        setOpenedLink(isUserEvent);
      }
    },
    [post, openedLink]
  );

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
