import { useState } from "react";
import "../Styles/UpdateProfile.css";
import axios from "axios"; // Ensure axios is imported
import Aside from "@/Components/Aside";
import NavBar from "@/Components/Navbar";
import { useNavigate } from "react-router-dom";
import { img } from "framer-motion/client";
import CommunityInputComponent from "@/Components/Community";
function UpdateProfile() {
    const navigate=useNavigate()
    const [isCommunity,setCommunity]=useState(false)

    const [userProfile, setUserProfile] = useState({
        skills: "",
        userBio: "",
    });
    const profileImage=localStorage.getItem("ProfilePhoto")
    const [image, setImage] = useState(null); // Add state to store selected image

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Store the selected image file
        console.log(image)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData to send both the profile data and image
        const formData = new FormData();
        formData.append("skills", userProfile.skills);
        formData.append("description", userProfile.userBio);
        if (image) {
            formData.append("image", image); // Append the selected image
        }

        try {
            const token = localStorage.getItem("token"); // Get token from local storage (adjust as needed)
            if (!token) {
                console.error("No token found");
                return;
            }

            const response = await axios.post("https://skill-share-c93a.onrender.com/profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization":token, // Send the token in the Authorization header
                },
            });

            console.log("Profile updated successfully:", response.data);
            alert("Profile updated successfully!");
            navigate("/profile/")
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    return (
        <>
        <NavBar/>
        <Aside setCommunity={setCommunity} isCommunity={isCommunity}/>
        { isCommunity && <CommunityInputComponent/>}
        <div className="profile-container">
            <div className="profile-card">
                <h2>Edit Profile</h2>

                {/* Profile Image Placeholder */}
                <div className="profile-image">
                    {image ?
                    <img src={URL.createObjectURL(image)} alt="" />:
                    <img src={profileImage}/>
                    }
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="skills"
                        id="skills"
                        placeholder="Enter Your Skills"
                        value={userProfile.skills}
                        onChange={handleChange}
                    />

                    <textarea
                        name="userBio"
                        id="userBio"
                        placeholder="Enter Bio"
                        maxLength={150}
                        value={userProfile.userBio}
                        onChange={handleChange}
                    />

                    {/* Input to select image */}
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    <button type="submit">Update Profile</button>
                </form>
            </div>
        </div>
    </>
    );
}

export default UpdateProfile;
