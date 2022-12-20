import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBlogData } from "../features/userSlice";
import axios from "axios";

const List = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog_url = `https://demo.sparklewpthemes.com/constructionlight/wp-json/wp/v2/posts/${id}`;

  useEffect(() => {
    axios
      .get(blog_url)
      .then((response) => {
        dispatch(setBlogData(response.data));
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, blog_url, dispatch]);

  return (
    <div style={{ margin: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p> Detail</p>
        </div>
        <div className="container">
          <strong> ID: </strong>
          <span>{user?.id}</span>
          <br />
          <strong> Date: </strong>
          <span>{user?.date}</span>
          <br />
          <strong> Title: </strong>
          <span>{user?.title?.rendered}</span>
          <br />
          <strong> Content: </strong>
          <span>{user?.content?.rendered}</span>
          <br />
          <strong> guid: </strong>
          <span>{user?.guid?.rendered}</span>
          <br />

          <Link to="/">
            <button className=" btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default List;
