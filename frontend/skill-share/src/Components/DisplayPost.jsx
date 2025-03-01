import '../Styles/DisplayPost.css'
function DisplayPost() {
    const postdata=[{ user:"ritik", title:"there is am using to Capture the nature", 
        description:"NAture love us we also need to love nature", hashtag:"Nature", 
        images:["https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=600"
        ],
        likes:100
        },
        {user:"vijay", title:"there is am using to Capture the nature", 
          description:"NAture love us we also need to love nature", hashtag:"Nature", 
          images:["https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=600"
        ],
        likes:200
        },
        {user:"vijay", title:"there is am using to Capture the nature", 
          description:"NAture love us we also need to love nature", hashtag:"Nature", 
          images:["https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=600"
        ],
        likes:129
        }
      ]
    return (
      <>
      <div className="displaypostcontainer">
        {postdata.map((post)=>{
          return(
            <>
              <div className="post">
              <div className="post-header">
              <div className="avatar"></div>
              <div>
              <h2 className="username">{post.user}</h2>
              <p className="user-role">Aspiring Full Stack Developer</p>
              </div>
          </div>
          <p className="post-title">{post.title}</p>
          <p className="post-description">{post.description}</p>
          <p className="post-hashtag">{post.hashtag}</p>
          <div className="post-images">
              {post.images.map((img, index) => (
              <img key={index} src={img} alt="Post screenshot" className="post-image" style={{maxHeight:"200px"}}/>
              ))}
          </div>
          <div className="post-actions">
              <span>👍 {post.likes}</span>
              <span>💬 Comment</span>
              <span>🔄 Repost</span>
              <span>📤 Send</span>
          </div>
          </div>
            </>
          )
        }) 
      }
      </div>
      </>
    );
}

export default DisplayPost;