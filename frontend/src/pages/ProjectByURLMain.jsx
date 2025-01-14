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
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateProjectMainURLModal from "../components/modals/UpdateProjectMainURLModal";

const { Title, Paragraph } = Typography;

const ProjectByURLMain = () => {
  const [projects, setProjects] = useState([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

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
      }
    };
    fetchProjects();
  }, []);

  // Create New Project (POST Request)
  const handleCreateProject = async (values) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      message.error("Authentication token missing.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/projects/main/createByUrl",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        message.success("Project created successfully!");
        setIsModalVisible(false);
        form.resetFields();
      } else {
        message.error("Failed to create the project.");
      }
    } catch (error) {
      message.error("An error occurred while creating the project.");
    } finally {
      setLoading(false);
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
        "http://localhost:3000/api/projects/main/deleteByUrl",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
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

  return (
    <div style={{ maxWidth: "1200px", margin: "50px auto", padding: "20px" }}>
      {/* Page Header */}
      <Title level={1} style={{ textAlign: "center" }}>
        Main Projects Management
      </Title>
      <Paragraph style={{ textAlign: "center" }}>
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

      {/* Project List with Fixed Height, Gaps, and First Screenshot Only */}
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
              height: "400px",
            }}
          >
            <Image
              src={project.screenshots[0]}
              alt={project.title}
              width="100%"
              height="200px"
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
            <p>
              <strong>Description:</strong> {project.description}
            </p>
            <p>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Link
              </a>
            </p>

            {/* Buttons Section */}
            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
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
                <Button type="danger" icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            </div>
          </Card>
        )}
      />

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
          <Form.Item
            label="GitHub Link"
            name="githubLink"
            rules={[{ required: true, type: "url" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Screenshot URLs (Comma Separated)"
            name="screenshots"
          >
            <Input.TextArea
              onChange={(e) =>
                form.setFieldsValue({
                  screenshots: e.target.value
                    .split(",")
                    .map((url) => url.trim()),
                })
              }
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Project
            </Button>
          </Form.Item>
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
