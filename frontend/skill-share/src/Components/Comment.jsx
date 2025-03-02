import React, { useState } from 'react';

const Comment= ({id}) => {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddComment = async () => {
    if (input.trim()) {
      const token = localStorage.getItem('token');
      const newComment = { comment: input.trim() };

      try {
        const response = await axios.post(
          `https://skill-share-c93a.onrender.com/posts/${id}/comments`,
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
    <div style={{ maxWidth: '500px', margin: '0 auto', 
            padding: '20px', 
            border: '1px solid #ddd', 
            borderRadius: '8px',
            marginTop:'50px' 
        }}>
      <h2 style={{ marginBottom: '10px' }}>Comments</h2>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Add a comment..."
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginBottom: '10px',
          }}
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
          Add Comment
        </button>
      </div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {comments.map((comment, index) => (
          <li
            key={index}
            style={{
              padding: '10px',
              borderBottom: '1px solid #eee',
              backgroundColor: '#f9f9f9',
              borderRadius: '4px',
              marginBottom: '8px',
            }}
          >
            {comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comment;
