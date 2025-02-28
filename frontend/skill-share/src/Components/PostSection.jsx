import { useContext } from 'react';
import '../Styles/Posts.css'
import { PostDataContext } from '@/ContextApi/PostData';
export default function Post({ user, postImage, caption, likes }) {
  const [postdata,setPostdata]=useContext(PostDataContext)
  console.log(postdata)
  return (
    <>
    <div className="posts">
        {postdata.map((data)=>{
          return(
            <div className="card">
          {/* <!-- User Info --> */}
          <div className="user-info">
              <div className="avatar">
                  <img src={data.image} alt="Profile"/>
              </div>
              <strong>_ritik_d</strong>
          </div>

          {/* <!-- Post Image --> */}
          <img src={data.image} alt="Post" className="post-image"/>

          {/* <!-- Post Actions --> */}
          <div className="actions">
              <button><i className="far fa-heart"></i></button>
              <button><i className="far fa-comment"></i></button>
              <button><i className="far fa-share-square"></i></button>
          </div>

          {/* <!-- Likes & Caption --> */}
          <div className="caption">
              <strong>{data.rating.count} likes</strong>
              <p><b>Username</b> This is the caption of the post.</p>
          </div>
        </div>
          )
        })
        }
    </div>
  </>
  );
}
