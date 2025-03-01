import { Routes, Route } from "react-router-dom";
import Profile from "./Components/TopComponent";
import Post from "./Components/PostSection";
import LoginForm from "./Pages/LoginPage";
import UpdateProfile from "./Pages/UpdateProfile";
import PostUpload from "./Pages/UplodePost";
import NavBar from "./Components/Navbar";
import PrivateRoute from "./Components/PrivateRoute";
import Aside from "./Components/Aside";
import "./App.css"; // Ensure global styles are applied
import SignIn from "./Pages/Signin";
import Home from "./Pages/HomePage";
import { AdBanner,MainPost} from "./Pages/MainPage";

function App() {
  const isAuthenticated = true; // Replace with actual authentication logic

  return (
    <>
      
      {/* <MainPost data={{ user:"ritik", title:"there is am using to Capture the nature", description:"NAture love us we also need to love nature", hashtag:"Nature", images:["https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=600"
      ] }}/> */}
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/home' element={<MainPost data={{ user:"ritik", title:"there is am using to Capture the nature", description:"NAture love us we also need to love nature", hashtag:"Nature", images:["https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=600"
      ] }}/>}/>
        <Route element={<PrivateRoute isAuthenticate={isAuthenticated} />}>
            <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/LoginForm" element={<LoginForm/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/updateprofile/" element={<UpdateProfile />} />
        <Route path="/uploadpost/" element={<PostUpload />} />
      </Routes>
    </>
  );
}

export default App;
