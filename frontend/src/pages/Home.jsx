import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import Header from "../components/Header";
import Dashboard from "./Dashboard";
import Projects from "./Projects";
import Content from "./Content";
import Profile from "./Profile";
import Settings from "./Settings";
import LowWidth from "./LowWidth";

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Detect window resize and update state
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render the LowWidth component if the screen width is below 1024px
  if (windowWidth < 1024) {
    return <LowWidth />;
  }

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
    padding: "80px 20px 20px 20px",
    marginLeft: "100px",
  },
};

export default Home;
