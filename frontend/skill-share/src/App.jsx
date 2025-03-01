import Profile from "./Components/TopComponent";
import Post from "./Components/PostSection";
import {Routes,Route} from 'react-router-dom'
import Login from "./Pages/LoginPage";
import UpdateProfile from "./Pages/UpdateProfile";
import PostUpload from "./Pages/UplodePost";
import NavBar from "./Components/Navbar";

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
     {/* <Profile/>
     <Post {...samplePost} /> */}
     <NavBar/>
     <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/updateprofile/" element={<UpdateProfile/>}/>
      <Route path="/uplodpost/" element={<PostUpload/>}/>

     </Routes>
    </>
   );
}

export default App;