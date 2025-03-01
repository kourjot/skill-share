import NavBar from "@/Components/Navbar";
import Aside from "@/Components/Aside";

import React from 'react';
import { FiHeart } from 'react-icons/fi';
import '../Styles/LikePage.css';
import { image } from "framer-motion/client";
import '../Styles/MainPage.css'

const likedPosts = [
  {
    id: 1,
    author: 'John Doe',
    content: 'Excited to share my new project on React! 🚀',
    likes: 125,
    images:["https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=600"
      ]
  },
  {
    id: 2,
    author: 'Jane Smith',
    content: 'Had a great time at the tech conference. Met amazing people!',
    likes: 87,
    images:[]
  },
  {
    id: 3,
    author: 'Mike Johnson',
    content: 'Learning Vite and it’s awesome! Blazing fast build times!',
    likes: 65,
    images:[]
  },
  {
    id: 3,
    author: 'Jane Smith',
    content: 'Had a great time at the tech conference. Met amazing people!',
    likes: 87,
    images:[]
  },
];
function LikePage() {
    return ( 
        <>
            <NavBar/>
            <h1 className='title' style={{width:"100%"}}>Liked Posts</h1>
            <div className='liked-posts-page'>
                {likedPosts.map((post) => (
                    
                    <div className="post">
                    <div className="post-header">
                        <div className="avatar"></div>
                        <div>
                        <h2 className="username">{post.author}</h2>
                        <p className="user-role">Aspiring Full Stack Developer</p>
                        </div>
                    </div>
                    <p className="post-title">{post.content}</p>
                    <p className="post-description">{post.content}</p>
                    {/* hastage */}
                    <p className="post-hashtag">{post.id}</p>
                    <div className="post-images">
                        {post.images.map((img, index) => (
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
              
                ))}
                {/* //// */}
              </div>
            
        </>
     );
}

export default LikePage;