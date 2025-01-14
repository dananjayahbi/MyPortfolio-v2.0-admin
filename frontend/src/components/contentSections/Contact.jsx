import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Typography, Card } from "antd";

const { Title } = Typography;

const Contact = () => {
    const [form] = Form.useForm();
    const [contact, setContact] = useState({
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        facebook: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/portfolio/content/get");
                const data = await response.json();
                setContact(data.contact);
                form.setFieldsValue(data.contact);
            } catch (error) {
                message.error("Failed to fetch contact data.");
            }
        };

        fetchData();
    }, [form]);

    const handleUpdateContact = async (values) => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            message.error("Authentication token is missing.");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:3000/api/portfolio/content/update",
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ contact: values }),
                }
            );

            if (response.ok) {
                message.success("Contact information updated successfully!");
            } else {
                message.error("Failed to update contact information.");
            }
        } catch (error) {
            message.error("An error occurred while updating contact information.");
        }
    };

    return (
        <Card style={{ maxWidth: "600px", margin: "auto", marginTop: "50px" }}>
            <Title level={2}>Update Contact Information</Title>
            
            {/* Form for Contact Section */}
            <Form
                form={form}
                layout="vertical"
                onFinish={handleUpdateContact}
            >
                {/* Email Field */}
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Please enter your email", type: "email" }]}
                >
                    <Input placeholder="Enter your email address" />
                </Form.Item>

                {/* Phone Field */}
                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: "Please enter your phone number" }]}
                >
                    <Input placeholder="Enter your phone number" />
                </Form.Item>

                {/* LinkedIn Field */}
                <Form.Item
                    label="LinkedIn"
                    name="linkedin"
                    rules={[{ required: true, message: "Please enter your LinkedIn profile link" }]}
                >
                    <Input placeholder="Enter your LinkedIn profile link" />
                </Form.Item>

                {/* GitHub Field */}
                <Form.Item
                    label="GitHub"
                    name="github"
                    rules={[{ required: true, message: "Please enter your GitHub profile link" }]}
                >
                    <Input placeholder="Enter your GitHub profile link" />
                </Form.Item>

                {/* Facebook Field */}
                <Form.Item
                    label="Facebook"
                    name="facebook"
                    rules={[{ required: true, message: "Please enter your Facebook profile link" }]}
                >
                    <Input placeholder="Enter your Facebook profile link" />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Update Contact Info
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Contact;
