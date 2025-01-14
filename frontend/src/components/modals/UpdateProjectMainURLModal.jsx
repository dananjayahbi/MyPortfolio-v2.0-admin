import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message, Tooltip } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";

const UpdateProjectMainURLModal = ({ isVisible, onClose, projectData }) => {
  const [form] = Form.useForm();
  const [screenshotUrls, setScreenshotUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newScreenshot, setNewScreenshot] = useState("");

  useEffect(() => {
    if (projectData) {
      form.setFieldsValue({
        title: projectData.title,
        description: projectData.description,
        githubLink: projectData.githubLink,
      });
      setScreenshotUrls(projectData.screenshots || []);
    }
  }, [projectData, form]);

  useEffect(() => {
    if (!isVisible) {
      form.resetFields();
      setScreenshotUrls([]);
    }
  }, [isVisible, form]);

  const handleAddScreenshot = () => {
    if (newScreenshot.trim() && !screenshotUrls.includes(newScreenshot)) {
      setScreenshotUrls([...screenshotUrls, newScreenshot]);
      setNewScreenshot("");
      message.success("Screenshot URL added.");
    } else {
      message.warning("Please enter a valid and unique URL.");
    }
  };

  const handleRemoveScreenshot = (url) => {
    const updatedUrls = screenshotUrls.filter((item) => item !== url);
    setScreenshotUrls(updatedUrls);
    message.success("Screenshot URL removed.");
  };

  const handleUpdateProject = async (values) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      message.error("Authentication token missing.");
      return;
    }

    setLoading(true);
    const updatedProject = {
      id: projectData.id,
      title: values.title,
      description: values.description,
      githubLink: values.githubLink,
      screenshots: screenshotUrls,
    };

    console.log(updatedProject);

    try {
      const response = await fetch(
        "http://localhost:3000/api/projects/main/updateByUrl",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProject),
        }
      );

      if (response.ok) {
        message.success("Project updated successfully!");
        onClose();
      } else {
        message.error("Failed to update the project.");
      }
    } catch (error) {
      message.error("An error occurred while updating the project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Update Project"
      width={800}
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdateProject}
        autoComplete="off"
      >
        {/* Project Title */}
        <Form.Item
          label="Project Title"
          name="title"
          rules={[{ required: true, message: "Please enter the project title" }]}
        >
          <Input />
        </Form.Item>

        {/* Project Description */}
        <Form.Item
          label="Project Description"
          name="description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        {/* GitHub Link */}
        <Form.Item
          label="GitHub Link"
          name="githubLink"
          rules={[
            { required: true, message: "Please enter a valid GitHub link" },
            { type: "url", message: "Enter a valid URL" },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Screenshot URLs with Flexbox and Proper Overflow Handling */}
        <Form.Item label="Screenshot URLs">
          <div style={{ marginBottom: "10px", maxHeight: "300px", overflowY: "auto" }}>
            {screenshotUrls.map((url, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #d9d9d9",
                  marginBottom: "8px",
                  backgroundColor: "#fafafa",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                {/* Tooltip for Full URL on Hover */}
                <Tooltip title={url}>
                  <span
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "90%",
                    }}
                  >
                    {url}
                  </span>
                </Tooltip>

                {/* Delete Button */}
                <Button
                  type="text"
                  danger
                  icon={<CloseOutlined />}
                  onClick={() => handleRemoveScreenshot(url)}
                />
              </div>
            ))}
          </div>

          {/* Add New Screenshot Input */}
          <Input
            placeholder="Add a new screenshot URL"
            value={newScreenshot}
            onChange={(e) => setNewScreenshot(e.target.value)}
            onPressEnter={handleAddScreenshot}
            style={{ marginBottom: "10px" }}
          />
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={handleAddScreenshot}
            block
          >
            Add Screenshot URL
          </Button>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            style={{
              borderRadius: "8px",
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
            }}
          >
            Update Project
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateProjectMainURLModal;
