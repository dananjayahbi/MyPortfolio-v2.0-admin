import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Typography, Row, Col } from "antd";

const { Title, Paragraph } = Typography;

const Projects = () => {
  const navigate = useNavigate();
  const [showProjectOptions, setShowProjectOptions] = useState({
    upload: false,
    urls: false,
  });

  const handleSelectType = (type) => {
    if (type === "upload") {
      setShowProjectOptions((prev) => ({ ...prev, upload: true }));
    } else if (type === "urls") {
      setShowProjectOptions((prev) => ({ ...prev, urls: true }));
    }
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "50px auto",
        padding: "20px",
      }}
    >
      <Title
        level={2}
        style={{ textAlign: "center", marginBottom: "40px", color: "#fff" }}
      >
        Pick Your Project Management Method
      </Title>

      {/* Flex Layout for the Cards */}
      <Row gutter={[32, 32]} justify="center">
        {/* Left Card: Upload Project Screenshots */}
        <Col xs={24} md={12}>
          <Card
            style={{
              borderRadius: "12px",
              border: "1px solid #d9d9d9",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <Title level={3}>By File Uploading</Title>
            <Paragraph>
              Upload screenshots of your project to create a new project or
              update an existing one. (To Be Developed ...)
            </Paragraph>
            {!showProjectOptions.upload ? (
              <Button
                type="primary"
                onClick={() => handleSelectType("upload")}
              >
                Select Project Type
              </Button>
            ) : (
              <div style={{ marginTop: "20px" }}>
                <Button
                  type="primary"
                  onClick={() => navigate("/projects/projectByUpload/main")}
                  style={{ marginRight: "10px" }}
                >
                  Main Project
                </Button>
                <Button
                  type="default"
                  onClick={() => navigate("/projects/projectByUpload/exp")}
                >
                  Experimental Project
                </Button>
              </div>
            )}
          </Card>
        </Col>

        {/* Right Card: Provide Screenshot URLs */}
        <Col xs={24} md={12}>
          <Card
            style={{
              borderRadius: "12px",
              border: "1px solid #d9d9d9",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <Title level={3}>By Providing URLs</Title>
            <Paragraph>
              Provide URLs to the screenshots of your project to create a new
              project or update an existing one.
            </Paragraph>
            {!showProjectOptions.urls ? (
              <Button
                type="primary"
                onClick={() => handleSelectType("urls")}
              >
                Select Project Type
              </Button>
            ) : (
              <div style={{ marginTop: "20px" }}>
                <Button
                  type="primary"
                  onClick={() => navigate("/projects/projectByURLs/main")}
                  style={{ marginRight: "10px" }}
                >
                  Main Project
                </Button>
                <Button
                  type="default"
                  onClick={() => navigate("/projects/projectByURLs/exp")}
                >
                  Experimental Project
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Projects;
