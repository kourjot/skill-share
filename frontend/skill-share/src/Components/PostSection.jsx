import '../Styles/Posts.css'
export default function Post({ user, postImage, caption, likes }) {
  return (
    <>
    <div className="card">
    {/* <!-- User Info --> */}
    <div className="user-info">
        <div className="avatar">
            <img src="user-avatar.jpg" alt="Profile"/>
        </div>
        <strong>Username</strong>
    </div>

    {/* <!-- Post Image --> */}
    <img src="post-image.jpg" alt="Post" className="post-image"/>

    {/* <!-- Post Actions --> */}
    <div className="actions">
        <button><i className="far fa-heart"></i></button>
        <button><i className="far fa-comment"></i></button>
        <button><i className="far fa-share-square"></i></button>
    </div>

    {/* <!-- Likes & Caption --> */}
    <div className="caption">
        <strong>100 likes</strong>
        <p><b>Username</b> This is the caption of the post.</p>
    </div>
  </div>
  </>
  );
}
