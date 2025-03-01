import NavBar from "@/Components/Navbar";
import Aside from "@/Components/Aside";
import PrivateRoute from "@/Components/PrivateRoute";
import { Routes,Route } from "react-router-dom";
import Profile from "@/Components/TopComponent";
import LoginForm from "./LoginPage";
import SignIn from "./Signin";
import UpdateProfile from "./UpdateProfile";
import PostUpload from "./UplodePost";
import Post from "@/Components/PostSection";

function Home() {
    const isAuthenticated=false
    return ( 
        <div className="appContainer">
        
            <NavBar />  
            <div className="mainLayout">
                <Aside /> {/* Sidebar */}
                <main className="content">
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/updateprofile" element={<UpdateProfile />} />
                    <Route path="/uploadpost" element={<PostUpload />} />
                    <Route path="/" element={<Post />} />
                </Routes>
                </main>
            </div>
        </div>
     );
}

export default Home;