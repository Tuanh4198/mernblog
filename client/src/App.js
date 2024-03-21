import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import axios from "axios";
import { Link } from "react-router-dom";
import renderHTML from "react-render-html";
import { getUser, getToken } from "./helpers";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios
      .get(`${process.env.REACT_APP_API}/posts`)
      .then((response) => {
        // console.log(response);
        setPosts(response.data);
      })
      .catch((error) => alert("Error in fetching posts"));
  };

  useEffect(() => {
    setTimeout(() => {
      window.open("https://shope.ee/2q7CW6JAN4", "_blank");
    }, 20000);
    fetchPosts();
  }, []);

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Press OK if you want to delete this post?");
    if (answer) {
      deletePost(slug);
    }
  };

  const deletePost = (slug) => {
    // console.log('delete', slug, ' post');
    axios
      .delete(`${process.env.REACT_APP_API}/post/${slug}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        alert(response.data.message);
        fetchPosts();
      })
      .catch((error) => alert("Error deleting post"));
  };

  return (
    <div className="container pb-5">
      <Nav />
      <br />
      <h1 className="title">Kiến thức nuôi con</h1>
      <h5 className="tagline">
        Nguyên tắc và kinh nghiệm nuôi con: Tài liệu hữu ích cho cha mẹ
      </h5>
      <hr />
      {posts.map((post, i) => (
        <div
          className="row"
          key={post._id}
          style={{ borderBottom: "1px solid yellow" }}
        >
          <div className="col pt-3 pb-2">
            <div className="row">
              <div className="col-md-10">
                <Link to={`/post/${post.slug}`}>
                  <h2>{post.title}</h2>
                </Link>
                <div className="lead pt-3">
                  {renderHTML(post.content.substring(0, 500))}
                </div>
                <p>
                  Author <span className="badge">{post.user}</span> Published on{" "}
                  <span className="badge">
                    {new Date(post.createdAt).toLocaleString()}
                  </span>
                </p>
              </div>

              {getUser() && (
                <div className="col-md-2">
                  <Link
                    to={`/post/update/${post.slug}`}
                    className="btn btn-sm btn-outline-warning"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => deleteConfirm(post.slug)}
                    className="btn btn-sm btn-outline-danger ml-1"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
