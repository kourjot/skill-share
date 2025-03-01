import { useState } from "react";
import "../Styles/PostUpload.css";
import axios from "axios";

function PostUpload() {
    const [post, setPost] = useState({
        image: null,
        description: "", // Updated to match backend
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPost((prev) => ({ ...prev, image: file })); // Store the file object for upload
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!post.image || !post.description) {
            alert("Please provide both an image and a description.");
            return;
        }

        // Create a FormData object to send data to the backend
        const formData = new FormData();
        formData.append("post", post.image); // Add the image file
        formData.append("description", post.description); // Add the description

        try {
            // Send a POST request to the backend to upload the image and description
            // const token = localStorage.getItem("token"); // Assuming you have the token stored in localStorage
            const response = await axios.post(
                "http://localhost:3110/uploadPost", // Your backend endpoint
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzJhNGNlNTI3MTAyOGIzODM1MTYwZiIsInVzZXJuYW1lIjoidmlqYXkiLCJlbWFpbCI6InZpamF5bmltYXI4QGdtYWlsLmNvbSIsImlhdCI6MTc0MDgxNDk2NiwiZXhwIjoxNzQwOTg3NzY2fQ.UqToFXB98W5H5-IbRomId2PuVVxH4wLsL28t7nS2rp8", // Include the token for authentication
                    },
                }
            );
            alert(response.data.message); // Display the success message from the backend
            // window.reload()
        } catch (error) {
            console.error("Error uploading post:", error);
            alert("Error uploading post. Please try again.");
        }
    };

    return (
        <div className="post-upload-container">
            <div className="post-card">
                <h2>Share Your Skill/Idea</h2>

                {/* Image Upload */}
                <label className="image-upload">
                    {post.image ? (
                        <img
                            src={URL.createObjectURL(post.image)}
                            alt="Preview"
                            className="preview-image"
                        />
                    ) : (
                        <span className="upload-placeholder">📷 Upload Image</span>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </label>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <textarea
                        name="description"
                        placeholder="Enter Description"
                        maxLength={200}
                        value={post.description}
                        onChange={handleChange}
                        style={{ maxHeight: "200px" }}
                    />

                    <button type="submit">Upload Post</button>
                </form>
            </div>
        </div>
    );
}

export default PostUpload;
