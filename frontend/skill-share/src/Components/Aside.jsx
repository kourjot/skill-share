import { useState } from "react";
import { FiHome, FiSearch, FiMessageSquare, FiPlusSquare, FiHeart, FiUser, FiMenu } from "react-icons/fi";
import "../Styles/Aside.css";

function Aside() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
            {/* Logo and Menu Toggle */}
            <div className="sidebar-header">
                {isOpen && <img src="/logo.png" alt="Skill-Share" className="logo" />}
                <FiMenu className="menu-icon" onClick={() => setIsOpen(!isOpen)} />
            </div>

            {/* Navigation Links */}
            <nav className="sidebar-nav">
                <a href="#" className="nav-item">
                    <FiHome className="nav-icon" /> {isOpen && <span>Home</span>}
                </a>
                <a href="#" className="nav-item">
                    <FiSearch className="nav-icon" /> {isOpen && <span>Search</span>}
                </a>
                <a href="#" className="nav-item">
                    <FiMessageSquare className="nav-icon" /> {isOpen && <span>Messages</span>}
                </a>
                <a href="#" className="nav-item">
                    <FiPlusSquare className="nav-icon" /> {isOpen && <span>Create</span>}
                </a>
                <a href="#" className="nav-item">
                    <FiHeart className="nav-icon" /> {isOpen && <span>Notifications</span>}
                </a>
                <a href="#" className="nav-item">
                    <FiUser className="nav-icon" /> {isOpen && <span>Profile</span>}
                </a>
            </nav>
        </aside>
    );
}

export default Aside;
