import React from "react";
import "../Styles/Profile.css"
import NavBar from "./Navbar";
import Aside from "./Aside";
import Post from "./PostSection";
export default function Profile() {
  return (
    <>
    <NavBar/>
    <Aside/>
    <div className="profile-container">
      <div className="profile-content">
        {/* Profile Picture */}
        <div className="profile-picture-container">
          <div className="profile-picture">
            <img src="https://via.placeholder.com/150" alt="Profile" />
          </div>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>

        {/* Profile Info */}
        <div className="profile-info">
          <div className="profile-header">
            <h2 className="username">_ritik_d</h2>
            <span className="settings-icon">⚙️</span>
          </div>

          {/* Stats */}
          <div className="profile-stats">
            <p><b>11</b> posts</p>
            <p><b>327</b> followers</p>
            <p><b>328</b> following</p>
          </div>

          {/* Bio */}
          <div className="profile-bio">
            <p><b>ritik dethliya</b></p>
            <p>💤 स्वपिष्यामि यदा प्रियॆ</p>
            <p>🧡 सनातनी__</p>
            <p>💝 navodayan</p>
            <p>😊 गोलगप्पे</p>
          </div>
        </div>
      </div>
    </div>
    <Post/>
    </>
  );
}

