import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Typography, Card, List } from "antd";

const { Title } = Typography;

const MyHobbies = () => {
    const [form] = Form.useForm();
    const [myHobbies, setMyHobbies] = useState({
        title: "",
        texts: [],
    });
    const [newHobby, setNewHobby] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/portfolio/content/get"
                );
                const data = await response.json();
                setMyHobbies(data.myHobbies);
            } catch (error) {
                message.error("Failed to fetch My Hobbies data.");
            }
        };

        fetchData();
    }, []);

    const handleAddHobby = () => {
        if (!newHobby.trim()) {
            message.error("Please enter a hobby.");
            return;
        }
        setMyHobbies((prev) => ({
            ...prev,
            texts: [...prev.texts, newHobby],
        }));
        setNewHobby("");
        message.success('Hobby added locally. Click "Update My Hobbies" to save changes.');
    };

    const handleRemoveHobby = (index) => {
        setMyHobbies((prev) => ({
            ...prev,
            texts: prev.texts.filter((_, i) => i !== index),
        }));
    };

    const handleUpdateMyHobbies = async () => {
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
                    body: JSON.stringify({ myHobbies }),
                }
            );

            if (response.ok) {
                message.success("My Hobbies section updated successfully!");
            } else {
                message.error("Failed to update My Hobbies section.");
            }
        } catch (error) {
            message.error("An error occurred while updating My Hobbies.");
        }
    };

    const handleTextChange = (index, value) => {
        setMyHobbies((prev) => {
            const updatedTexts = [...prev.texts];
            updatedTexts[index] = value;
            return { ...prev, texts: updatedTexts };
        });
    };

    return (
        <Card style={{ maxWidth: "600px", margin: "auto", marginTop: "50px" }}>
            <Title level={2}>Update My Hobbies Section</Title>

            {/* Form for Adding New Hobby */}
            <Form layout="vertical">
                <Form.Item label="Add New Hobby">
                    <Input
                        value={newHobby}
                        onChange={(e) => setNewHobby(e.target.value)}
                        placeholder="Enter a new hobby"
                    />
                </Form.Item>
                <Button type="dashed" onClick={handleAddHobby}>
                    Add Hobby
                </Button>
            </Form>

            <Title level={4} style={{ marginTop: "20px" }}>Current Hobbies</Title>

            {/* Display Current Hobbies with Editable Inputs */}
            <List
                bordered
                dataSource={myHobbies.texts}
                renderItem={(text, index) => (
                    <List.Item
                        actions={[
                            <Button
                                type="link"
                                danger
                                onClick={() => handleRemoveHobby(index)}
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
                onClick={handleUpdateMyHobbies}
            >
                Update My Hobbies
            </Button>
        </Card>
    );
};

export default MyHobbies;
