import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Typography, Card, List } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";

const { Title } = Typography;

const FunFacts = () => {
  const [form] = Form.useForm();
  const [funFacts, setFunFacts] = useState({
    title: "",
    texts: [],
  });
  const [newFact, setNewFact] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/portfolio/content/get"
        );
        const data = await response.json();
        setFunFacts(data.funFacts);
      } catch (error) {
        message.error("Failed to fetch Fun Facts data.");
      }
    };

    fetchData();
  }, []);

  const handleAddFact = () => {
    if (!newFact.trim()) {
      message.error("Please enter a fact.");
      return;
    }
    setFunFacts((prev) => ({
      ...prev,
      texts: [...prev.texts, newFact],
    }));
    setNewFact("");
    message.success(
      'Fact added locally. Click "Update Fun Facts" to save changes.'
    );
  };

  const handleRemoveFact = (index) => {
    setFunFacts((prev) => ({
      ...prev,
      texts: prev.texts.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateFunFacts = async () => {
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
          body: JSON.stringify({ funFacts }),
        }
      );

      if (response.ok) {
        message.success("Fun Facts section updated successfully!");
      } else {
        message.error("Failed to update Fun Facts section.");
      }
    } catch (error) {
      message.error("An error occurred while updating Fun Facts.");
    }
  };

  const handleTextChange = (index, value) => {
    setFunFacts((prev) => {
      const updatedTexts = [...prev.texts];
      updatedTexts[index] = value;
      return { ...prev, texts: updatedTexts };
    });
  };

  return (
    <Card style={{ marginTop: "-20px" }}>
      {/* Form for Adding New Fun Fact */}
      <Form layout="vertical">
        <Form.Item label="Add New Fun Fact">
          <Input
            value={newFact}
            onChange={(e) => setNewFact(e.target.value)}
            placeholder="Enter a new fun fact"
          />
        </Form.Item>
        <Button color="primary" variant="outlined" onClick={handleAddFact}>
          Add Fun Fact
        </Button>
      </Form>

      <Title level={4} style={{ marginTop: "20px" }}>
        Current Fun Facts
      </Title>

      {/* Display Current Fun Facts with Editable Inputs */}
      <List
        bordered
        dataSource={funFacts.texts}
        renderItem={(text, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemoveFact(index)}
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
        onClick={handleUpdateFunFacts}
      >
        <CloudUploadOutlined />Update Fun Facts
      </Button>
    </Card>
  );
};

export default FunFacts;
