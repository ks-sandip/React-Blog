import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBlogData } from "../features/userSlice";
import { useState, useEffect } from "react";
// import { useEffect } from "react";
import "../styling/blogs.css";
import { Link, NavLink } from "react-router-dom";

const Blogs = () => {
  const user = useSelector((state) => state.user);
  const blog = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true);
  const blogData = useSelector((state) => state.user.blogData);

  const blogData1 = useSelector((state) => state.blog.blogData);

  console.log(blogData, "lol");
  console.log(user);
  // const { id } = useParams;
  const blog_url = `https://demo.sparklewpthemes.com/constructionlight/wp-json/wp/v2/posts/`;
  // const blogU = useMemo(() => {
  //   return blog_url;
  // }, [blog_url]);
  useEffect(() => {
    axios
      .get(blog_url)
      .then((response) => {
        dispatch(setBlogData(response.data));
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    // localStorage.setItem("dataKey", JSON.stringify(blogU));
  }, [dispatch, blog_url]);

  return (
    <div className="blog__page">
      <h1 className="blog__page__header">Blogs</h1>

      {loading ? <h1 className="loading">Loading...</h1> : ""}
      <div className="blogs">
        {blogData1.length > 0 &&
          blogData1?.map((blog) => (
            <Link className="blog" to={`/view/${blog.id}`}>
              <span>{blog?.id}</span>
              <div>
                <h3>
                  <p>{blog?.title?.rendered}</p>
                  <div>{blog?.date}</div>
                </h3>
              </div>
            </Link>
          ))}
        {blogs?.payload === 0 && (
          <h1 className="no_blogs">
            No blogs available.Search something else ...
          </h1>
        )}
      </div>
    </div>
  );
};

export default Blogs;
