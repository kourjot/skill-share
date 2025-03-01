import React from "react";
import '../Styles/MainPage.css'
import Aside from "@/Components/Aside";
import NavBar from "@/Components/Navbar";
const MainPost = ({data}) => {
    const { user, title, description, hashtag, images }=data
  return (
    <>
    <NavBar/>
    <Aside/>
    <div className="postcontainer">
        <div className="post">
        <div className="post-header">
            <div className="avatar"></div>
            <div>
            <h2 className="username">{user}</h2>
            <p className="user-role">Aspiring Full Stack Developer</p>
            </div>
        </div>
        <p className="post-title">{title}</p>
        <p className="post-description">{description}</p>
        <p className="post-hashtag">{hashtag}</p>
        <div className="post-images">
            {images.map((img, index) => (
            <img key={index} src={img} alt="Post screenshot" className="post-image" />
            ))}
        </div>
        <div className="post-actions">
            <span>👍 Like</span>
            <span>💬 Comment</span>
            <span>🔄 Repost</span>
            <span>📤 Send</span>
        </div>
        </div>
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
