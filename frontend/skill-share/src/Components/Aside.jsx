import { useState } from "react";
import { FiHome, FiSearch, FiMessageSquare, FiPlusSquare, FiHeart, FiUser,FiEdit, FiMenu ,FiUsers } from "react-icons/fi";
import "../Styles/Aside.css";
import { NavLink } from "react-router-dom";
import { HiUserGroup } from "react-icons/hi";

function Aside(props) {
    const [isOpen, setIsOpen] = useState(true);
    const {setCommunity, isCommunity} = props;
    
    return (
        <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
            {/* Logo and Menu Toggle */}
            <div className="sidebar-header">
                {isOpen && <img src="/logo.png" alt="Skill-Share" className="logo" />}
                <FiMenu className="menu-icon" onClick={() => setIsOpen(!isOpen)} />
            </div>

            {/* Navigation Links */}
            <nav className="sidebar-nav">
                <NavLink to='/home' className="nav-item">   
                    <FiHome className="nav-icon" /> {isOpen && <span>Home</span>}
                </NavLink>
                
                <NavLink to="/" className="nav-item">
                    <HiUserGroup className="nav-icon" /> {isOpen && <span>Community App</span>}
                </NavLink>
                
                <NavLink to="/Community/" className="nav-item">
                    <FiUsers className="nav-icon" /> {isOpen && <span>Communities</span>}
                </NavLink>

                <NavLink to="/uploadpost/" className="nav-item">
                    <FiEdit className="nav-icon" /> {isOpen && <span>Post</span>}
                </NavLink>
                <NavLink className="nav-item">
                <FiPlusSquare className="nav-icon" onClick={()=>(setCommunity(!isCommunity))}/> {isOpen && <span>Create Community</span>}
                </NavLink>


                <NavLink to="/profile/" className="nav-item">
                    <FiUser className="nav-icon" /> {isOpen && <span>Profile</span>}
                </NavLink>
            </nav>
        </aside>
    );
}

export default Aside;