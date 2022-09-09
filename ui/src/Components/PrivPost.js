import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './CSS/global.css';
import config from '../config';
import Header from "./Header";
import { AppContext } from "../AppContext";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


const PrivPost = () => {
  const params = useParams();
  const nav = useNavigate();
  const id = params.post
  const username = params.username
  const [post, setPost] = useState([])
  const {setters} = useContext(AppContext)

  
  useEffect(() => {
    fetch(`${ApiUrl}/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data[0]))
      .then(console.log(post))
      .catch(err => console.log(err))
  }, []);

  const editPost = (title, content) => {
    if(confirm('Ready to submit?')) {
      const updated = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: title,
          content: content,
        })
      }
      fetch(`${ApiUrl}/posts`, updated)
      .then(res => res.json)
      .then(data => setters.setPosts(data))
      nav(`/profile/${username}`)
      }
  }

  const deletePost = () => {
      const deleted = {
        method: 'DELETE'
      }
      fetch(`${ApiUrl}/posts/${id}`, deleted)
      .then(res => res.json)
      .then(data => console.log(data))
      nav(`/profile/${username}`)
  }

  return(
    <div className="background">
      <Header/>
      <button onClick={() =>{deletePost()}}>Delete</button>
      <div className="IndvPosts">
          <textarea className="postHeader" defaultValue={post.title} id="titleInput"/>
          <textarea className="postBody" defaultValue={post.content} id="contentInput"/>
      </div>
      <button onClick={() => {editPost(document.getElementById('titleInput').value, document.getElementById('contentInput').value)}}>Submit Edits</button>
    </div>
  )
}

export default PrivPost;