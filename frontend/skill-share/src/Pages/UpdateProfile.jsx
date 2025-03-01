import { useState } from "react";
import "../Styles/UpdateProfile.css";
import axios from "axios"; // Ensure axios is imported

function UpdateProfile() {
    const [userProfile, setUserProfile] = useState({
        skills: "",
        userBio: "",
    });

    const [image, setImage] = useState(null); // Add state to store selected image

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Store the selected image file
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

            const response = await axios.post("http://localhost:3110/profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzJhNGNlNTI3MTAyOGIzODM1MTYwZiIsInVzZXJuYW1lIjoidmlqYXkiLCJlbWFpbCI6InZpamF5bmltYXI4QGdtYWlsLmNvbSIsImlhdCI6MTc0MDgxNDk2NiwiZXhwIjoxNzQwOTg3NzY2fQ.UqToFXB98W5H5-IbRomId2PuVVxH4wLsL28t7nS2rp8", // Send the token in the Authorization header
                },
            });

            console.log("Profile updated successfully:", response.data);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>Edit Profile</h2>

                {/* Profile Image Placeholder */}
                <div className="profile-image">📷</div>

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
    );
}

export default UpdateProfile;
