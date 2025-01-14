import React from "react";
import { Link } from "react-router-dom";
import { Home, Briefcase, FileText, User, FileUser } from "lucide-react";
import { Popover } from "antd";

const NavMenu = () => {
  return (
    <nav style={styles.navContainer}>
      <ul style={styles.menuList}>
        {/* Dashboard */}
        <Popover content="Dashboard" placement="right">
          <li style={styles.menuItem}>
            <Link to="/" style={styles.iconLink}>
              <Home size={30} />
            </Link>
          </li>
        </Popover>

        {/* Projects */}
        <Popover content="Update Projects" placement="right">
          <li style={styles.menuItem}>
            <Link to="/projects" style={styles.iconLink}>
              <Briefcase size={30} />
            </Link>
          </li>
        </Popover>

        {/* Content */}
        <Popover content="Update Content" placement="right">
          <li style={styles.menuItem}>
            <Link to="/content" style={styles.iconLink}>
              <FileText size={30} />
            </Link>
          </li>
        </Popover>

        {/* Profile */}
        <Popover content="Update Profile" placement="right">
          <li style={styles.menuItem}>
            <Link to="/profile" style={styles.iconLink}>
              <User size={30} />
            </Link>
          </li>
        </Popover>

        {/* Update CV */}
        <Popover content="Update CV" placement="right">
          <li style={styles.menuItem}>
            <Link to="/update-cv" style={styles.iconLink}>
              <FileUser size={30} />
            </Link>
          </li>
        </Popover>
      </ul>
    </nav>
  );
};

// Styling for the navigation menu
const styles = {
  navContainer: {
    height: "100vh",
    width: "100px", // Reduced the width
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "#f0b818",
    padding: "20px 0", // Adjusted padding for vertical centering
    boxShadow: "2px 0 5px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Vertically centered items
    justifyContent: "center",
  },
  menuList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    width: "100%",
  },
  menuItem: {
    padding: "20px 0",
    textAlign: "center",
    cursor: "pointer",
  },
  iconLink: {
    color: "#000",
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
  },
};

export default NavMenu;
