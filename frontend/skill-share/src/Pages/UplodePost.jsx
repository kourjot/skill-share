import { useState } from "react";
import "../Styles/PostUpload.css";

function PostUpload() {
    const [post, setPost] = useState({
        image: null,
        title: "",
        location: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPost((prev) => ({ ...prev, image: imageUrl }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Uploaded Post:", post);
        // TODO: Send the data to an API or backend storage
    };

    return (
        <div className="post-upload-container">
            <div className="post-card">
                <h2>Share Your skill/idea</h2>

                {/* Image Upload */}
                <label className="image-upload">
                    {post.image ? (
                        <img src={post.image} alt="Preview" className="preview-image" />
                    ) : (
                        <>
                        <span className="upload-placeholder">📷 Upload Image</span>
                        
                        </>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange}/>
                </label>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter Post Title"
                        value={post.title}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Enter Location"
                        value={post.location}
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Enter Description"
                        maxLength={200}
                        value={post.description}
                        onChange={handleChange}
                        style={{maxHeight:"200px"}}
                    />

                    <button type="submit">Upload Post</button>
                </form>
            </div>
        </div>
    );
}

export default PostUpload;
