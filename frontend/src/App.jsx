import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { ConfigProvider } from "antd";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const isLogged = window.sessionStorage.getItem("LoggedIn");

  const theme = {
    token: {
      // Seed Token
      colorPrimary: "#4e97fd",
      colorTextBase: "#000",
    },
  };

  return (
    <ConfigProvider theme={theme}>
      <Routes>
        {isLogged ? (
          <>
            <Route path="*" element={<Dashboard />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </ConfigProvider>
  );
};

export default App;
