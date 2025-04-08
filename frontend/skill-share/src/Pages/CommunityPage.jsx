import React, { useEffect, useState } from "react";
import Aside from "@/Components/Aside";
import NavBar from "@/Components/Navbar";
import axios from "axios";
import '../Styles/CommunityPage.css'
import CommunityInputComponent from "@/Components/Community";
import { useNavigate } from "react-router-dom";

const CommunityPage = () => {
    const [Postdata,setPostdata]=useState([])
    const [isComment,setComment]=useState(false)
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [postcomments,setComments]=useState(null)
    const [isCommunity,setCommunity]=useState(false)
    const [community,setcommunity]=useState([])
    const navigate=useNavigate()

    function navigatetoChat(){
      navigate("/chats")
    }
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

    async function joinCommunity(name) {
        const token = localStorage.getItem("token");
        
        if (!token) {
            console.error("No token found. User might not be authenticated.");
            return;
        }
    
        try {
            console.log("Sending community name:", name);
            
            const response = await axios.post(
                "https://skill-share-c93a.onrender.com/joinCommunity",
                { name }, // Ensure the payload matches the expected format
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json"
                    },
                }
            );
    
            if (response.status >= 200 && response.status < 300) {
                console.log("Successfully joined the community:", response.data);
                alert("Community Joined ")
            } else {
                console.error("Failed to join the community. Status:", response.status);
            }
        } catch (err) {
            console.error("Error joining community:", err.response?.data?.message || err.message);
        }
    }
    
  return (
    <>
    <NavBar setCommunity={setCommunity} isCommunity={isCommunity}/>
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
        <button className="join-btn" onClick={()=>{joinCommunity(communit.name)}}>Join</button>
        <button className="message-btn" onClick={()=>navigatetoChat()}>Message</button>
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
