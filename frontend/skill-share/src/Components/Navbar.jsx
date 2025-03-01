import { useState } from "react";
import { FiHome, FiSearch, FiPlusSquare, FiHeart, FiUser, FiMenu } from "react-icons/fi";
import "../Styles/NavBar.css";

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="nav-left">
                <img src="/logo.png" alt="Logo" className="logo" />
            </div>

            {/* Search Bar */}
            <div className="nav-center">
                <input type="text" placeholder="Search" className="search-input" />
            </div>

            {/* Navigation Icons */}
            <div className={`nav-right ${menuOpen ? "open" : ""}`}>
                <FiHome className="nav-icon" />
                <FiSearch className="nav-icon mobile-hide" />
                <FiPlusSquare className="nav-icon" />
                <FiHeart className="nav-icon" />
                <FiUser className="nav-icon" />
            </div>

            {/* Mobile Menu Button */}
            <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                <FiMenu />
            </div>
        </nav>
    );
}

export default NavBar;
