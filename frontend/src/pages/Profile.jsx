import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const token = window.sessionStorage.getItem("token");

    if (!token) {
      message.error("No authorization token found. Please log in again.");
      return;
    }

    const requestData = {
      username: "admin", // Static username for now
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    setLoading(true);
    try {
      const response = await axios.put(
        "http://localhost:3000/api/auth",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        message.success("Password changed successfully!");
        form.resetFields(); // Clear the form fields
      } else {
        message.error("Failed to change password.");
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || "Error updating password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Change Admin Password</h2>
      <hr style={styles.hr} />
      <Form
        form={form}
        name="passwordChangeForm"
        layout="vertical"
        onFinish={onFinish}
        style={styles.form}
      >
        {/* Old Password Input */}
        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={[
            { required: true, message: "Please input your old password!" },
          ]}
        >
          <Input.Password placeholder="Enter old password" />
        </Form.Item>

        {/* New Password Input */}
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: "Please input your new password!" },
            { min: 5, message: "Password must be at least 5 characters long!" },
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={styles.button}
          >
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

// Inline styling for Profile Page
const styles = {
  container: {
    padding: "20px",
    maxWidth: "400px",
    margin: "100px auto",
    border: "1px solid #fff",
    backgroundColor: "#fdfff5",
    borderRadius: "10px",
    color: "#fff",
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#000",
    fontFamily: "'Arial', sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Arial', sans-serif",
  },
  button: {
    width: "100%",
    fontFamily: "'Arial', sans-serif",
  },
  hr: {
    margin: "20px 0",
  },
};

export default Profile;
