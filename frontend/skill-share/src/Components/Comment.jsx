import React, { useState } from 'react';

const Comment= () => {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddComment = () => {
    if (input.trim()) {
      setComments([...comments, input.trim()]);
      setInput('');
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
