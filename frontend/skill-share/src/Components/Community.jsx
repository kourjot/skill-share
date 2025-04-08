import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Community.css'
const CommunityInputComponent = () => {
  const [communityName, setCommunityName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found!');
      return;
    }

    if (!communityName.trim()) {
      console.error('Community name is required');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'https://skill-share-c93a.onrender.com/makeCommunity',
        { name:communityName },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log('Community created successfully:', response.data);
        setCommunityName('');
      } else {
        console.log('Unexpected response status:', response.status);
      }
    } catch (err) {
      if (err.response) {
        console.error('Server error:', err.response.data);
      } else {
        console.error('Request error:', err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='community-container' >
      <h2 style={{textAlign:"center"}}>Create Community</h2>
      <form onSubmit={handleSubmit} className='community-form'>
        <input className='community-input'
          type="text"
          placeholder="Enter Community Name"
          value={communityName}
          onChange={(e) => setCommunityName(e.target.value)}
        />
        <button className="community-button" type="submit" disabled={loading} >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CommunityInputComponent;
