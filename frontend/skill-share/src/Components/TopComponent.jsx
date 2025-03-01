import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure you have axios installed
import "../Styles/Profile.css";
import NavBar from "./Navbar";
import Aside from "./Aside";
import Post from "./PostSection";

export default function Profile() {
  const [userProfile, setUserProfile] = useState(null); // State to store profile data
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetch user profile data from API
    const fetchUserProfile = async () => {
      try {
        // const token = localStorage.getItem("token"); // Get token from localStorage or cookies
        const response = await axios.get("http://localhost:3110/getprofile", {
          headers: {
            Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzMxMGY0ZmY3ZDE1MzYzZGMzMzJkMSIsInVzZXJuYW1lIjoidmlqYXkiLCJlbWFpbCI6InZpamF5bmltYXIwMDdAZ21haWwuY29tIiwiaWF0IjoxNzQwODM3MTQyLCJleHAiOjE3NDEwMDk5NDJ9.j2Mcbrk_hdW9jJ_hUwTVz6QMeMVKXQbLtoqp5DQtCV0" , // Pass token in the Authorization header
          },
        });
        setUserProfile(response.data.userProfile); // Set the response data into state
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false); // Stop loading even on error
      }
    };

    fetchUserProfile(); // Call the function when component mounts
  }, []);

  // If profile data is still loading, show loading spinner
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // If profile data is not available, show an error message
  if (!userProfile) {
    return <div className="error">Error fetching profile data.</div>;
  }

  return (
    <>
      <NavBar />
      <Aside />
      <div className="profile-container">
        <div className="profile-content">
          {/* Profile Picture */}
          <div className="profile-picture-container">
            <div className="profile-picture">
              <img
                src={userProfile.image || "https://via.placeholder.com/150"}
                alt="Profile"
              />
            </div>
            <button className="edit-profile-btn">Edit Profile</button>
          </div>

          {/* Profile Info */}
          <div className="profile-info">
            <div className="profile-header">
              <h2 className="username">{userProfile.username}</h2>
              <span className="settings-icon">⚙️</span>
            </div>

            {/* Stats */}
            <div className="profile-stats">
              <p>
                <b>{userProfile.totalPosts || 0}</b> posts
              </p>
              <p>
                <b>{userProfile.totalFollowers || 0}</b> followers
              </p>
              <p>
                <b>{userProfile.totalFollowing || 0}</b> following
              </p>
            </div>

            {/* Bio */}
            <div className="profile-bio">
              <p>
                <b>{userProfile.username}</b>
              </p>
              <p>{userProfile.bio}</p>
              <p>{userProfile.skills}</p>
            </div>
          </div>
        </div>
      </div>
      <Post />
    </>
  );
}