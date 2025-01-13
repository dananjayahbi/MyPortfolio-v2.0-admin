import React from "react";
import { Route, Routes } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import Header from "../components/Header";
import Dashboard from "./Dashboard";
import Projects from "./Projects";
import Content from "./Content";
import Profile from "./Profile";
import Settings from "./Settings";

const Home = () => {
  return (
    <div style={styles.container}>
      {/* Left-side fixed NavMenu */}
      <NavMenu />

      {/* Header Added */}
      <Header />

      {/* Main content area */}
      <div style={styles.contentArea}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/content" element={<Content />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

// Layout styling
const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    minHeight: "100vh",
    backgroundColor: "#181818",
    color: "#fff",
  },
  contentArea: {
    flex: 1,
    padding: "80px 20px 20px 20px", // Adjusted padding for header spacing
    marginLeft: "100px",
  },
};

export default Home;
