import { useContext } from 'react';
import { PostDataContext } from '@/ContextApi/PostData';
import '../Styles/DisplayPost.css';
import axios from 'axios';

function DisplayPost() {
  const [postdata, setPostdata] = useContext(PostDataContext);

  console.log('Post Data Length:', Array.isArray(postdata) ? postdata : 'Not an array');

  async function sendPostData(id){
    console.log(id)
    const token = localStorage.getItem("token");
    //console.log(user,title,description)
      try{
        const responce= await axios.post("https://skill-share-c93a.onrender.com/allPhoto",id,{
          headers: {
            Authorization:token
          },
        })
      }
      catch(err){
        console.log(err.message)
      }
      
  }

  return (
    <div className="displaypostcontainer">
      {Array.isArray(postdata) && postdata.length > 0 ? (
        postdata.map((post, index) => (
          <div key={index} className="post">
            <div className="post-header">
              <div className="avatar"></div>
              <div>
                <h2 className="username">{post.username}</h2>
                <p className="user-role">Aspiring Full Stack Developer</p>
              </div>
            </div>
            <p className="post-title">{post.title}</p>
            <p className="post-description">{post.description}</p>
            <p className="post-hashtag">{post.hashtag}</p>
            <div className="post-images">
              {/* {post.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Post screenshot"
                  className="post-image"
                  style={{ maxHeight: '200px' }}
                />
              ))} */}
              <img
                  key={index}
                  src={post.photo}
                  alt="Post screenshot"
                  className="post-image"
                  style={{ maxHeight: '200px' }}
                />
            </div>
            <div className="post-actions">
              <span>👍 {post.likes}</span>
              <span onClick={()=>sendPostData(post["_id"])} id="comment">💬 Comment</span>
              <span>🔄 Repost</span>
              <span>📤 Send</span>
            </div>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default DisplayPost;
