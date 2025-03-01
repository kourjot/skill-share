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

function App() {
  const isAuthenticated = true; // Replace with actual authentication logic

  return (
    <>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route element={<PrivateRoute isAuthenticate={isAuthenticated} />}>
            <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/LoginForm" element={<LoginForm/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/updateprofile/" element={<UpdateProfile />} />
        <Route path="/uploadpost" element={<PostUpload />} />
      </Routes>
    </>
  );
}

export default App;
