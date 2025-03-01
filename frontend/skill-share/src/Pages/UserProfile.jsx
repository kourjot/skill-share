import NavBar from "@/Components/Navbar";
import Profile from "@/Components/TopComponent";
function UserProfile() {
    return ( 
        <div className="appContainer">
            <NavBar />
        <div className="mainLayout">
          <Aside /> 
          <main className="content">
            <Profile/>
          </main>
        </div>
      </div>
     );
}

export default UserProfile;