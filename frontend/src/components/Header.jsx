import React from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { User } from "lucide-react";

const Header = () => {
    const navigate = useNavigate();

    // Handling logout and profile click
    const handleMenuClick = (key) => {
        if (key === "profile") {
            navigate("/profile");
        } else if (key === "logout") {
            window.sessionStorage.removeItem("LoggedIn");
            window.sessionStorage.removeItem("user");
            navigate("/login");
        }
    };

    // Dropdown menu items
    const menu = (
        <Menu onClick={({ key }) => handleMenuClick(key)}>
            <Menu.Item key="profile">Profile</Menu.Item>
            <Menu.Item key="logout">Logout</Menu.Item>
        </Menu>
    );

    return (
        <div style={styles.headerContainer}>
            {/* Profile Icon with Dropdown */}
            <Dropdown overlay={menu} trigger={["click"]}>
                <User size={30} style={styles.profileIcon} />
            </Dropdown>
        </div>
    );
};

const styles = {
    headerContainer: {
        position: "fixed",
        top: 0,
        left: "100px",
        right: 0,
        height: "60px",
        backgroundColor: "#f0b818",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 20px",
        zIndex: 1000,
    },
    profileIcon: {
        cursor: "pointer",
        color: "#000",
    },
};

export default Header;
