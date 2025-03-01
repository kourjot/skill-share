import React, { useEffect, useState } from "react";
import Aside from "@/Components/Aside";
import NavBar from "@/Components/Navbar";
import axios from "axios";

const MainPost = () => {
    const [Postdata,setPostdata]=useState([])
    
    async function getposts(){
      try{
        const token = localStorage.getItem("token");
        const responce= await axios.get("https://skill-share-c93a.onrender.com/allPhoto/")
        const Postdata=setPostdata(responce.data.data)
        console.log("data",Postdata)
      }
      catch(err){
        console.log(err.message)
      }
    }
    useEffect(()=>{
      getposts()
    },[])
    async function sendPostData(post){
      const {user,title,description}=post
      const token = localStorage.getItem("token");
      console.log(user,title,description)
        try{
          const responce= await axios.post("",post,{
            headers: {
              Authorization:token
            },
          })
        }
        catch(err){
          console.log(err.message)
        }
        
    }
  return (
    <>
    <NavBar/>
    <Aside/>
    <div className="postcontainer">
      {Postdata.map((post)=>{
        return(
          <>
            <div className="post">
            <div className="post-header">
            <div className="avatar"></div>
            <div>
            <h2 className="username">{post.username}</h2>
            <p className="user-role">Aspiring Full Stack Developer</p>
            </div>
        </div>
        <p className="post-title">{post.description}</p>
        <p className="post-description">{post.description}</p>
        <p className="post-hashtag">{post.hashtag}</p>
        <div className="post-images">
            {/* {post.images.map((img, index) => (
            <img key={index} src={img} alt="Post screenshot" className="post-image" style={{maxHeight:"200px"}}/>
            ))} */}
            <img src={post.photo} alt="Post screenshot" className="post-image" style={{maxHeight:"200px"}}/>
            
        </div>
        <div className="post-actions">
            <span>👍 {post.likes}</span>
            <span onClick={()=>sendPostData(post)} id="comment">💬Comment</span>
            <span>🔄 Repost</span>
            <span>📤 Send</span>
        </div>
        </div>
          </>
        )
      }) 
    }
    </div>
    </>
  );
};

const AdBanner = () => (
  <div className="ad-banner">
    <h3 className="ad-title">Microsoft Developer</h3>
    <p className="ad-description">Meet industry standards with built-in compliance tools.</p>
    <button className="ad-button">Learn More</button>
  </div>
);

export { MainPost, AdBanner };
