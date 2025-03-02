import React, { useEffect, useState } from "react";
import Aside from "@/Components/Aside";
import NavBar from "@/Components/Navbar";
import axios from "axios";
import '../Styles/CommunityPage.css'
import CommunityInputComponent from "@/Components/Community";

const CommunityPage = () => {
    const [Postdata,setPostdata]=useState([])
    const [isComment,setComment]=useState(false)
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [postcomments,setComments]=useState(null)
    const [isCommunity,setCommunity]=useState(false)
    const [community,setcommunity]=useState([])
    async function getCommunity(){
      try{
        const token = localStorage.getItem("token");
        const responce= await axios.get("https://skill-share-c93a.onrender.com/getCommunity")
        console.log(responce.data.data)
        setcommunity(responce.data.data)
        
      }
      catch(err){
        console.log(err.message)
      }
    }

    useEffect(()=>{
      getCommunity()
    },[])
    // async function sendPostData(post){
    //   const {user,title,description}=post
    //   const token = localStorage.getItem("token");
    //     try{
    //       const responce= await axios.post("",post,{
    //         headers: {
    //           Authorization:token
    //         },
    //       })
    //     }
    //     catch(err){
    //       console.log(err.message)
    //     }
        
    // }
  return (
    <>
    <NavBar/>
    <Aside setCommunity={setCommunity} isCommunity={isCommunity}/>
    {isComment && <Comment id={selectedPostId}
     setComment={setComment} isComment={isComment}/>}
     { isCommunity && <CommunityInputComponent/>}
     
    <div className="postcontainer">
      {community.map((communit)=>{
        return(
          <>
            <div className="post">
            <div className="post-header">
            {/* <div className="avatar"></div> */}
            <div>
            <h2 className="username">{communit.name}</h2>
            </div>
        </div>
        <button className="join-btn">Join</button>
        <button className="message-btn">Message</button>
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

export { CommunityPage, AdBanner };
