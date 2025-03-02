import { useState } from "react";
import { FiHome, FiSearch, FiMessageSquare, FiPlusSquare, FiHeart, FiUser, FiMenu } from "react-icons/fi";
import "../Styles/Aside.css";
import { NavLink } from "react-router-dom";

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
                    <FiSearch className="nav-icon" /> {isOpen && <span>Search</span>}
                </NavLink>
                
                <NavLink to="/messages" className="nav-item">
                    <FiMessageSquare className="nav-icon" /> {isOpen && <span>Messages</span>}
                </NavLink>

                <NavLink to="/uploadpost/" className="nav-item">
                    <FiPlusSquare className="nav-icon" /> {isOpen && <span>Post</span>}
                </NavLink>

                {/* Fixed Community Link */}
                <div className="nav-item" onClick={() => setCommunity(!isCommunity)}>
                    <FiPlusSquare className="nav-icon" /> {isOpen && <span>Community</span>}
                </div>

                <NavLink to="/profile/" className="nav-item">
                    <FiUser className="nav-icon" /> {isOpen && <span>Profile</span>}
                </NavLink>
            </nav>
        </aside>
    );
}

export default Aside;