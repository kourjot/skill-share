import React, { useState } from 'react';
import axios from 'axios'; 
import { FiX } from "react-icons/fi";
import '../Styles/Comment.css'
import { useNavigate } from 'react-router-dom';
const Comment= (props) => {
  const navigate=useNavigate()
  // const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');
  const {id,postcomments,setComment,isComment}=props
  //console.log(id,postcomments,props)
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddComment = async () => {
    if (input.trim()) {
      const token = localStorage.getItem('token');
      const newComment = { comment: input.trim() };

      try {
        console.log("Sending Comment....",token,id,newComment)
        const response = await axios.post(
          `https://skill-share-c93a.onrender.com/commentPost/${id}`,
          { text: input.trim()},
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          }
        
        );

        if (response.status <=300) {
          setInput('');
          navigate("/home")
        }
        else{
          console.log(response.status)
        }
      } catch (err) {
        console.error('Error posting comment:', err.message);
      }
    }
  };

  return (
    <div className="comment-box">
      <FiX className='close-button' size={24} color="black" onClick={()=>setComment(!isComment)} />
      <h2 style={{ marginBottom: '10px' }}>Comments</h2>
    <div className='Comment-container'>
      <ul className='PrevComment' style={{ listStyleType: 'none', padding: 0 }}>
        {postcomments.map((comment, index) => (
          <li
            key={index}
            
          >
            {comment.username}--{comment.text}
          </li>
        ))}
      </ul> 
    </div>
    <div className='Comment-input-box' >
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="give a comment..."
        />
        <button
          onClick={handleAddComment}
          className='comment-send-btn'
        >
          Send
        </button>
      </div>
  </div>
  );
};

export default Comment;
