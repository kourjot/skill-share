import React, { useState } from 'react';
import axios from 'axios'; 
import { FiX } from "react-icons/fi";
import '../Styles/Comment.css'
const Comment= (props) => {
  const [comments, setComments] = useState([]);
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
          newComment,
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          setComments([...comments, response.data.comment]);
          setInput('');
        }
      } catch (err) {
        console.error('Error posting comment:', err.message);
      }
    }
  };

  return (
    <div className='Comment-container'>
      <h2 style={{ marginBottom: '10px' }}>Comments</h2>
      <FiX className='close-button' size={24} color="black" onClick={()=>setComment(!isComment)} />
      <ul className='PrevComment' style={{ listStyleType: 'none', padding: 0 }}>
        {postcomments.map((comment, index) => (
          <li
            key={index}
            
          >
            {comment.username}--{comment.text}
          </li>
        ))}
      </ul>
      <div className='Comment-input-box' >
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Add a comment..."
        />
        <button
          onClick={handleAddComment}
          style={{
            padding: '8px 16px',
            border: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
      
    </div>
  );
};

export default Comment;
