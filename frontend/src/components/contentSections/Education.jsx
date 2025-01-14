import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Typography, Card, List } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Education = () => {
  const [form] = Form.useForm();
  const [education, setEducation] = useState({
    title: "",
    texts: [],
  });
  const [newEducation, setNewEducation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/portfolio/content/get"
        );
        const data = await response.json();
        setEducation(data.education);
      } catch (error) {
        message.error("Failed to fetch Education data.");
      }
    };

    fetchData();
  }, []);

  const handleAddEducation = () => {
    if (!newEducation.trim()) {
      message.error("Please enter an education entry.");
      return;
    }
    setEducation((prev) => ({
      ...prev,
      texts: [...prev.texts, newEducation],
    }));
    setNewEducation("");
    message.success(
      'Education entry added locally. Click "Update Education" to save changes.'
    );
  };

  const handleRemoveEducation = (index) => {
    setEducation((prev) => ({
      ...prev,
      texts: prev.texts.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateEducation = async () => {
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
          body: JSON.stringify({ education }),
        }
      );

      if (response.ok) {
        message.success("Education section updated successfully!");
      } else {
        message.error("Failed to update Education section.");
      }
    } catch (error) {
      message.error("An error occurred while updating the Education section.");
    }
  };

  const handleTextChange = (index, value) => {
    setEducation((prev) => {
      const updatedTexts = [...prev.texts];
      updatedTexts[index] = value;
      return { ...prev, texts: updatedTexts };
    });
  };

  return (
    <Card style={{ marginTop: "-20px" }}>
      {/* Form for Adding New Education Entry */}
      <Form layout="vertical">
        <Form.Item label="Add New Education">
          <Input
            value={newEducation}
            onChange={(e) => setNewEducation(e.target.value)}
            placeholder="Enter new education entry"
          />
        </Form.Item>
        <Button color="primary" variant="outlined" onClick={handleAddEducation}>
          Add Education
        </Button>
      </Form>

      <Title level={4} style={{ marginTop: "20px" }}>
        Current Education Entries
      </Title>

      {/* Display Current Education Entries with Editable Inputs */}
      <List
        bordered
        dataSource={education.texts}
        renderItem={(text, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleRemoveEducation(index)}
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
        onClick={handleUpdateEducation}
      >
        <CloudUploadOutlined />
        Update Education
      </Button>
    </Card>
  );
};

export default Education;
