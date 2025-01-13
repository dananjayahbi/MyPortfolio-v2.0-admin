import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import Logo from "../assets/profile.png";
import { EyeClosed, Eye } from "lucide-react";

const LoginPage = () => {
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth",
        values
      );
      if (response.status === 200) {
        message.success("Login successful!");
        window.sessionStorage.setItem("LoggedIn", true);
        window.sessionStorage.setItem("user", JSON.stringify(response.data));
        window.location.href = "/";
      } else {
        message.error("Login failed! Please check your credentials.");
      }
    } catch (error) {
      message.error("Login failed! Something went wrong!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#121212",
      }}
    >
      <div
        style={{
          border: "1px solid #dadce0",
          borderRadius: "25px",
          width: "400px",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={Logo}
            alt="logo"
            style={{ width: "150px", marginBottom: "20px" }}
          />
          <span
            style={{
              color: "#3c4043",
              fontFamily: "Roboto, sans-serif",
              fontSize: "30px",
              fontWeight: 500,
            }}
          >
            Sign in
          </span>
          <br />
          <br />
          <Form
            name="login"
            layout="vertical"
            style={{ width: "100%" }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              label={<span style={{ color: "#fff" }}>Username</span>}
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              {/* <p style={{color: "#fff", marginBottom: "2px", marginLeft: "3px"}}>Username</p> */}
              <Input
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #fff",
                  color: "#fff",
                }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label={<span style={{ color: "#fff" }}>Password</span>}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              {/* <p style={{color: "#fff", marginBottom: "2px", marginLeft: "3px"}}>Password</p> */}
              <Input.Password
                iconRender={(visible) =>
                  visible ? <Eye color="#ffffff" /> : <EyeClosed color="#ffffff" />
                }
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #fff",
                  color: "#fff",
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
