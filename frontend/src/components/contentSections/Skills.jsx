import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Typography, Card, Divider } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Skills = () => {
  const [form] = Form.useForm();
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState({
    title: "",
    name: "",
    image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/portfolio/content/get"
        );
        const data = await response.json();
        setSkills(data.skills.subTitles);
      } catch (error) {
        message.error("Failed to fetch skills data.");
      }
    };

    fetchData();
  }, []);

  const handleAddSkill = () => {
    if (!currentSkill.title || !currentSkill.name || !currentSkill.image) {
      message.error("Please fill all fields before adding a skill.");
      return;
    }

    setSkills((prevSkills) => {
      const existingSubTitle = prevSkills.find(
        (skill) => skill.title === currentSkill.title
      );
      if (existingSubTitle) {
        const existingTech = existingSubTitle.technologies.find(
          (tech) => tech.name === currentSkill.name
        );
        if (existingTech) {
          existingTech.image = currentSkill.image;
        } else {
          existingSubTitle.technologies.push({
            name: currentSkill.name,
            image: currentSkill.image,
          });
        }
      } else {
        prevSkills.push({
          title: currentSkill.title,
          technologies: [
            { name: currentSkill.name, image: currentSkill.image },
          ],
        });
      }
      return [...prevSkills];
    });

    setCurrentSkill({ title: "", name: "", image: "" });
    message.success(
      'Skill added locally. Click "Update Skills" to save changes.'
    );
  };

  const handleUpdateSkills = async () => {
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
          body: JSON.stringify({ skills: { subTitles: skills } }),
        }
      );

      if (response.ok) {
        message.success("Skills updated successfully!");
      } else {
        message.error("Failed to update skills.");
      }
    } catch (error) {
      message.error("An error occurred while updating skills.");
    }
  };

  return (
    <Card style={{ marginTop: "-20px" }}>
      <Form layout="vertical">
        <Form.Item label="Skill Category Title">
          <Input
            value={currentSkill.title}
            onChange={(e) =>
              setCurrentSkill({ ...currentSkill, title: e.target.value })
            }
            placeholder="Enter category title (e.g., Frontend)"
          />
        </Form.Item>
        <Form.Item label="Technology Name">
          <Input
            value={currentSkill.name}
            onChange={(e) =>
              setCurrentSkill({ ...currentSkill, name: e.target.value })
            }
            placeholder="Enter technology name (e.g., React)"
          />
        </Form.Item>
        <Form.Item label="Technology Image URL">
          <Input
            value={currentSkill.image}
            onChange={(e) =>
              setCurrentSkill({ ...currentSkill, image: e.target.value })
            }
            placeholder="Enter image URL"
          />
        </Form.Item>
        <Button color="primary" variant="outlined" onClick={handleAddSkill}>
          Add Skill Locally
        </Button>
      </Form>

      <Divider />

      <Title level={3}>Current Skills</Title>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {skills.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Title level={4} style={{ marginBottom: "10px" }}>
              {item.title}
            </Title>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
              }}
            >
              {item.technologies.map((tech, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "5px 10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    backgroundColor: "#fff",
                  }}
                >
                  <img
                    src={tech.image}
                    alt={tech.name}
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Divider />
      <Button type="primary" onClick={handleUpdateSkills}>
        <CloudUploadOutlined /> Update Skills to Server
      </Button>
    </Card>
  );
};

export default Skills;
