import React, { useContext, useEffect } from "react";
import './CSS/global.css'
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import config from '../config';
import Header from "./Header";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const PublicPosts = () => {
  const nav = useNavigate();
  const {values, setters} = useContext(AppContext);

  useEffect(() => {
    fetch(`${ApiUrl}/posts`)
    .then(res => res.json())
    .then(data => setters.setPosts(data))
    .then(console.log(values.posts))
    .catch(err => console.log(err))
    fetch(`${ApiUrl}/users`)
    .then
  }, []);
  return(
    <div className="background">
      <Header/>
      {values.posts.map(post => (
      <div key={post.id}className="viewAllPosts" onClick={()=> {nav(`/publicfeed/${post.id}`)}}>
        <h2 className="postHeader">{post.title}</h2>
        <p className="postBody">{post.content.length < 100 ? post.content : post.content.substring(0,100)+'...'}<p>@{}</p><p>{post.date}</p></p>
      </div>))}
    </div>
  )
}

export default PublicPosts;