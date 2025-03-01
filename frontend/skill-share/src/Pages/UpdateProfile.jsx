import { useState } from "react";
import "../Styles/UpdateProfile.css"; 

function UpdateProfile() {
    const [userProfile, setUserProfile] = useState({
        userName: "",
        userBio: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Profile:", userProfile);
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
                        name="userName"
                        id="userName"
                        placeholder="Enter User Name"
                        value={userProfile.userName}
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

                    <button type="submit">Update Profile</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProfile;
