import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Typography,
  Card,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import { CloudUploadOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Author = () => {
  const [form] = Form.useForm();
  const [author, setAuthor] = useState({
    name: "",
    post: "",
    dob: "",
    age: "",
    freelance: "",
    residence: "",
    email: "",
    phone: "",
    myStatus: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/portfolio/content/get"
        );
        const data = await response.json();
        setAuthor(data.author);
        form.setFieldsValue({
          ...data.author,
          dob: data.author.dob ? dayjs(data.author.dob, "DD-MM-YYYY") : null,
        });
      } catch (error) {
        message.error("Failed to fetch content data.");
      }
    };

    fetchData();
  }, [form]);

  const handleUpdateAuthor = async (values) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      message.error("Authentication token is missing.");
      return;
    }

    setLoading(true);

    const updatedValues = {
      ...values,
      dob: values.dob ? values.dob.format("DD-MM-YYYY") : "",
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/portfolio/content/update",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ author: updatedValues }),
        }
      );

      if (response.ok) {
        message.success("Author details updated successfully!");
      } else {
        message.error("Failed to update author details.");
      }
    } catch (error) {
      message.error("An error occurred while updating author details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ marginTop: "-20px" }}>
      <Form form={form} layout="vertical" onFinish={handleUpdateAuthor}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the author name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Post"
          name="post"
          rules={[{ required: true, message: "Please enter the author post" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Date of Birth"
          name="dob"
          rules={[
            { required: true, message: "Please enter the date of birth" },
          ]}
        >
          <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please enter the age" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Freelance Status"
          name="freelance"
          rules={[{ required: true, message: "Please enter freelance status" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Residence"
          name="residence"
          rules={[{ required: true, message: "Please enter residence" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter a valid email",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please enter a valid phone number" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="My Status"
          name="myStatus"
          rules={[{ required: true, message: "Please enter your status" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            <CloudUploadOutlined />
            {loading ? "Updating..." : "Update Author"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Author;
