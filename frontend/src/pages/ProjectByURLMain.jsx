import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  List,
  message,
  Typography,
  Modal,
  Image,
  Popconfirm,
  Spin,
  Tag,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import UpdateProjectMainURLModal from "../components/modals/UpdateProjectMainURLModal";

const { Title, Paragraph } = Typography;

const ProjectByURLMain = () => {
  const [projects, setProjects] = useState([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [screenshotUrls, setScreenshotUrls] = useState([]);
  const [newScreenshot, setNewScreenshot] = useState("");

  // Fetch Projects (GET Request)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/projects/main/read"
        );
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        message.error("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Create New Project with Correct Body Structure (POST Request)
  const handleCreateProject = async (values) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      message.error("Authentication token missing.");
      return;
    }

    if (screenshotUrls.length === 0) {
      message.warning("Please add at least one screenshot URL.");
      return;
    }

    const projectData = {
      title: values.title,
      description: values.description,
      githubLink: values.githubLink, // ✅ Added GitHub Link Field
      screenshots: screenshotUrls,
    };

    setCreating(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/projects/main/createByUrl",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        }
      );

      if (response.ok) {
        message.success("Project created successfully!");
        setIsModalVisible(false);
        form.resetFields();
        setScreenshotUrls([]);
      } else {
        message.error("Failed to create the project.");
      }
    } catch (error) {
      message.error("An error occurred while creating the project.");
    } finally {
      setCreating(false);
    }
  };

  // Delete Project (DELETE Request)
  const handleDeleteProject = async (id) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      message.error("Authentication token missing.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/projects/main/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        message.success("Project deleted successfully!");
        setProjects((prev) => prev.filter((project) => project.id !== id));
      } else {
        message.error("Failed to delete the project.");
      }
    } catch (error) {
      message.error("An error occurred while deleting the project.");
    }
  };

  // Open Update Modal
  const handleUpdateProject = (project) => {
    setCurrentProject(project);
    setIsUpdateModalVisible(true);
  };

  // Handle Adding Individual URLs One by One
  const handleAddScreenshot = () => {
    if (newScreenshot.trim() && !screenshotUrls.includes(newScreenshot)) {
      setScreenshotUrls([...screenshotUrls, newScreenshot]);
      setNewScreenshot("");
      message.success("Screenshot URL added.");
    } else {
      message.warning("Please enter a valid and unique URL.");
    }
  };

  // Handle Removing URLs
  const handleRemoveScreenshot = (url) => {
    const updatedUrls = screenshotUrls.filter((item) => item !== url);
    setScreenshotUrls(updatedUrls);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      {/* Page Header */}
      <Title level={1} style={{ textAlign: "center", color: "#fff" }}>
        Main Projects Management
      </Title>
      <Paragraph style={{ textAlign: "center", color: "#fff" }}>
        Manage your main projects created using screenshot URLs.
      </Paragraph>

      {/* Add New Project Button */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add New Project
        </Button>
      </div>

      {/* Spinner When Loading */}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          <p>Loading projects...</p>
        </div>
      ) : (
        <List
          grid={{ gutter: 32, column: 3 }}
          dataSource={projects}
          renderItem={(project) => (
            <Card
              title={project.title}
              bordered
              hoverable
              style={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                height: "500px",
                margin: "5px",
              }}
            >
              <Image
                src={project.screenshots[0]}
                alt={project.title}
                preview={false}
                width="100%"
                height="200px"
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />{" "}
              <br /> <br />
              <p>
                <strong>Description: </strong>
              </p>
              <p>{project.description.split(" ").slice(0, 5).join(" ")}...</p>{" "}
              <br />
              {/* ✅ Added GitHub Link */}
              <p>
                <strong>GitHub Link:</strong>
              </p>
              <p>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.githubLink}
                </a>
              </p>{" "}
              <br />
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => handleUpdateProject(project)}
                >
                  Update
                </Button>
                <Popconfirm
                  title="Are you sure to delete this project?"
                  onConfirm={() => handleDeleteProject(project.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    color="danger"
                    variant="outlined"
                    icon={<DeleteOutlined />}
                  >
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            </Card>
          )}
        />
      )}

      {/* Modal for Creating New Project */}
      <Modal
        title="Create a New Main Project"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateProject}>
          <Form.Item
            label="Project Title"
            name="title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          {/* ✅ Added GitHub Link Field */}
          <Form.Item
            label="GitHub Link"
            name="githubLink"
            rules={[{ required: true, type: "url" }]}
          >
            <Input placeholder="Enter GitHub Repository URL" />
          </Form.Item>
          <Input
            placeholder="Add Screenshot URL"
            value={newScreenshot}
            onChange={(e) => setNewScreenshot(e.target.value)}
            onPressEnter={handleAddScreenshot}
            style={{ marginBottom: "10px" }}
          />
          <Button onClick={handleAddScreenshot} icon={<PlusOutlined />} block>
            Add Screenshot URL to the list
          </Button>

          <div style={{ marginTop: "10px" }}>
            {screenshotUrls.map((url, index) => (
              <Tag
                key={index}
                closable
                onClose={() => handleRemoveScreenshot(url)}
              >
                {url}
              </Tag>
            ))}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "20px" }}
            loading={creating}
            block
          >
            Create Project
          </Button>
        </Form>
      </Modal>
      {/* Separated Update Modal Component */}
      <UpdateProjectMainURLModal
        isVisible={isUpdateModalVisible}
        onClose={() => setIsUpdateModalVisible(false)}
        projectData={currentProject}
      />
    </div>
  );
};

export default ProjectByURLMain;
