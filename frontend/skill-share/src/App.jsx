import Profile from "./Components/TopComponent";
import Post from "./Components/PostSection";
function App() {
  const samplePost = {
    user: {
      username: "_ritik_d",
      avatar: "https://via.placeholder.com/50", // Replace with actual profile pic
    },
    postImage: "https://via.placeholder.com/400", // Replace with actual post image
    caption: "Exploring new places! 🌍✨",
    likes: 327,
  };
  return ( 
    <>
     <Profile/>
     <Post {...samplePost} />
    </>
   );
}

export default App;