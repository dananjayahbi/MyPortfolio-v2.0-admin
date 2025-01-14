import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Typography,
  Card,
  List,
  Space,
} from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";

const { Title } = Typography;

const CurrentlyIAm = () => {
  const [form] = Form.useForm();
  const [currentlyIAm, setCurrentlyIAm] = useState({
    title: "",
    texts: [],
  });
  const [newText, setNewText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/portfolio/content/get"
        );
        const data = await response.json();
        setCurrentlyIAm(data.currentlyIAm);
      } catch (error) {
        message.error("Failed to fetch currentlyIAm data.");
      }
    };

    fetchData();
  }, []);

  const handleAddText = () => {
    if (!newText.trim()) {
      message.error("Please enter some text.");
      return;
    }
    setCurrentlyIAm((prev) => ({
      ...prev,
      texts: [...prev.texts, newText],
    }));
    setNewText("");
    message.success(
      'Text added locally. Click "Update Currently I Am" to save changes.'
    );
  };

  const handleRemoveText = (index) => {
    setCurrentlyIAm((prev) => ({
      ...prev,
      texts: prev.texts.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateCurrentlyIAm = async () => {
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
          body: JSON.stringify({ currentlyIAm }),
        }
      );

      if (response.ok) {
        message.success("Currently I Am section updated successfully!");
      } else {
        message.error("Failed to update Currently I Am section.");
      }
    } catch (error) {
      message.error(
        "An error occurred while updating the Currently I Am section."
      );
    }
  };

  const handleTextChange = (index, value) => {
    setCurrentlyIAm((prev) => {
      const updatedTexts = [...prev.texts];
      updatedTexts[index] = value;
      return { ...prev, texts: updatedTexts };
    });
  };

  return (
    <Card style={{ marginTop: "-20px" }}>
      {/* Form for Adding New Text */}
      <Form layout="vertical">
        <Form.Item label="Add New Text">
          <Input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Enter new activity text"
          />
        </Form.Item>
        <Button color="primary" variant="outlined" onClick={handleAddText}>
          Add New Text
        </Button>
      </Form>

      <Title level={4} style={{ marginTop: "20px" }}>
        Current Activities
      </Title>

      {/* Display Current Texts with Editable Inputs */}
      <List
        bordered
        dataSource={currentlyIAm.texts}
        renderItem={(text, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemoveText(index)}
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
        onClick={handleUpdateCurrentlyIAm}
      >
        <CloudUploadOutlined />
        Update Currently I Am
      </Button>
    </Card>
  );
};

export default CurrentlyIAm;
