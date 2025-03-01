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
            Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzIyZjU4ODRhNDI5MGY4Yzk5Y2E2ZCIsInVzZXJuYW1lIjoiam90IiwiZW1haWwiOiJwa291cjYxODhAZ21haWwuY29tIiwiaWF0IjoxNzQwNzc5Mzc2LCJleHAiOjE3NDA5NTIxNzZ9.tq_vKyT277HxUwJJZKubtiSyEk73gvadt2RQgb5f3jY" , // Pass token in the Authorization header
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