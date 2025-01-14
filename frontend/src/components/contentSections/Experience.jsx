import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Typography, Card, List } from "antd";

const { Title } = Typography;

const Experience = () => {
    const [form] = Form.useForm();
    const [experience, setExperience] = useState({
        title: "",
        texts: [],
    });
    const [newExperience, setNewExperience] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/portfolio/content/get"
                );
                const data = await response.json();
                setExperience(data.experience);
            } catch (error) {
                message.error("Failed to fetch Experience data.");
            }
        };

        fetchData();
    }, []);

    const handleAddExperience = () => {
        if (!newExperience.trim()) {
            message.error("Please enter a valid experience.");
            return;
        }
        setExperience((prev) => ({
            ...prev,
            texts: [...prev.texts, newExperience],
        }));
        setNewExperience("");
        message.success('Experience added locally. Click "Update Experience" to save changes.');
    };

    const handleRemoveExperience = (index) => {
        setExperience((prev) => ({
            ...prev,
            texts: prev.texts.filter((_, i) => i !== index),
        }));
    };

    const handleUpdateExperience = async () => {
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
                    body: JSON.stringify({ experience }),
                }
            );

            if (response.ok) {
                message.success("Experience section updated successfully!");
            } else {
                message.error("Failed to update Experience section.");
            }
        } catch (error) {
            message.error("An error occurred while updating the Experience section.");
        }
    };

    const handleTextChange = (index, value) => {
        setExperience((prev) => {
            const updatedTexts = [...prev.texts];
            updatedTexts[index] = value;
            return { ...prev, texts: updatedTexts };
        });
    };

    return (
        <Card style={{ maxWidth: "600px", margin: "auto", marginTop: "50px" }}>
            <Title level={2}>Update Experience Section</Title>

            {/* Form for Adding New Experience */}
            <Form layout="vertical">
                <Form.Item label="Add New Experience">
                    <Input
                        value={newExperience}
                        onChange={(e) => setNewExperience(e.target.value)}
                        placeholder="Enter new experience"
                    />
                </Form.Item>
                <Button type="dashed" onClick={handleAddExperience}>
                    Add Experience
                </Button>
            </Form>

            <Title level={4} style={{ marginTop: "20px" }}>Current Experience</Title>

            {/* Display Current Experience with Editable Inputs */}
            <List
                bordered
                dataSource={experience.texts}
                renderItem={(text, index) => (
                    <List.Item
                        actions={[
                            <Button
                                type="link"
                                danger
                                onClick={() => handleRemoveExperience(index)}
                            >
                                Remove
                            </Button>,
                        ]}
                    >
                        <Input
                            value={text}
                            onChange={(e) => handleTextChange(index, e.target.value)}
                        />
                    </List.Item>
                )}
            />

            <Button
                type="primary"
                style={{ marginTop: "20px" }}
                onClick={handleUpdateExperience}
            >
                Update Experience
            </Button>
        </Card>
    );
};

export default Experience;
