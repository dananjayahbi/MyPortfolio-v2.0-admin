import React from "react";

const LowWidth = () => {
  return (
    <div style={styles.overlay}>
      <h1 style={styles.message}>Screen Width Too Small!</h1>
      <p style={styles.subText}>Please use a device with a screen width of 1024px or higher.</p>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#121212",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999, // Ensures it is displayed above everything
    textAlign: "center",
  },
  message: {
    fontSize: "36px",
    fontWeight: "bold",
  },
  subText: {
    fontSize: "20px",
    marginTop: "10px",
  },
};

export default LowWidth;
