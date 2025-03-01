import { useState } from "react";
import { FiHome, FiSearch, FiPlusSquare, FiHeart, FiUser, FiMenu } from "react-icons/fi";
import "../Styles/NavBar.css";
import { NavLink } from "react-router-dom";
function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="nav-left">
                <h2 id="logo">Skill-Share</h2>
            </div>

            {/* Search Bar */}
            <div className="nav-center">
                <input type="text" placeholder="Search" className="search-input" />
            </div>

            {/* Navigation Icons */}
            <div className={`nav-right ${menuOpen ? "open" : ""}`}>
                <NavLink to='/'><FiHome className="nav-icon" /></NavLink>
                
                <FiSearch className="nav-icon mobile-hide" />
                <NavLink to="/uploadpost/"><FiPlusSquare className="nav-icon" /></NavLink>
                <FiHeart className="nav-icon" />
                <NavLink to='/profile/'><FiUser className="nav-icon" /></NavLink>
                
            </div>

            {/* Mobile Menu Button */}
            <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                <FiMenu />
            </div>
        </nav>
    );
}

export default NavBar;
