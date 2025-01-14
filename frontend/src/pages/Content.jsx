import React, { useState } from "react";
import { Typography, Divider, Tabs, Card } from "antd";
import {
  UserOutlined,
  InfoCircleOutlined,
  CodeOutlined,
  TrophyOutlined,
  SmileOutlined,
  ExperimentOutlined,
  BookOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import Author from "../components/contentSections/Author";
import AboutMe from "../components/contentSections/AboutMe";
import Skills from "../components/contentSections/Skills";
import CurrentlyIAm from "../components/contentSections/CurrentlyIAm";
import MyHobbies from "../components/contentSections/MyHobbies";
import FunFacts from "../components/contentSections/FunFacts";
import Experience from "../components/contentSections/Experience";
import Education from "../components/contentSections/Education";
import Contact from "../components/contentSections/Contact";

const { Title } = Typography;
const { TabPane } = Tabs;

const Content = () => {
  const [activeComponent, setActiveComponent] = useState("author");

  const renderComponent = () => {
    const cardStyle = {
      borderRadius: "12px",
      border: "1px solid #d9d9d9",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      background: "#fff",
      flex: 1,
      width: "100%",
      maxWidth: "100%",
      padding: "20px", // Reduced padding for a tighter layout
    };

    switch (activeComponent) {
      case "author":
        return (
          <Card style={cardStyle}>
            <Author />
          </Card>
        );
      case "aboutMe":
        return (
          <Card style={cardStyle}>
            <AboutMe />
          </Card>
        );
      case "skills":
        return (
          <Card style={cardStyle}>
            <Skills />
          </Card>
        );
      case "currentlyIAm":
        return (
          <Card style={cardStyle}>
            <CurrentlyIAm />
          </Card>
        );
      case "myHobbies":
        return (
          <Card style={cardStyle}>
            <MyHobbies />
          </Card>
        );
      case "funFacts":
        return (
          <Card style={cardStyle}>
            <FunFacts />
          </Card>
        );
      case "experience":
        return (
          <Card style={cardStyle}>
            <Experience />
          </Card>
        );
      case "education":
        return (
          <Card style={cardStyle}>
            <Education />
          </Card>
        );
      case "contact":
        return (
          <Card style={cardStyle}>
            <Contact />
          </Card>
        );
      default:
        return <Title level={3}>Select a component to view.</Title>;
    }
  };

  return (
    <Card
      style={{
        maxWidth: "100%",
        margin: "20px auto", // Reduced margin for a tighter layout
        padding: "20px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        borderRadius: "15px",
        border: "1px solid #d9d9d9",
        background: "#f5f5f5",
      }}
    >

      {/* Flex Layout for Side Tabs and Content Display */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
        {/* Vertical Tabs Section */}
        <Tabs
          defaultActiveKey="author"
          onChange={(key) => setActiveComponent(key)}
          tabPosition="left"
          size="large"
          style={{ minWidth: "220px" }}
        >
          <TabPane tab={<span><UserOutlined /> Author</span>} key="author" />
          <TabPane tab={<span><InfoCircleOutlined /> About Me</span>} key="aboutMe" />
          <TabPane tab={<span><CodeOutlined /> Skills</span>} key="skills" />
          <TabPane tab={<span><TrophyOutlined /> Currently I Am</span>} key="currentlyIAm" />
          <TabPane tab={<span><SmileOutlined /> My Hobbies</span>} key="myHobbies" />
          <TabPane tab={<span><ExperimentOutlined /> Fun Facts</span>} key="funFacts" />
          <TabPane tab={<span><BookOutlined /> Experience</span>} key="experience" />
          <TabPane tab={<span><BookOutlined /> Education</span>} key="education" />
          <TabPane tab={<span><PhoneOutlined /> Contact</span>} key="contact" />
        </Tabs>

        {/* Content Section Beside Tabs */}
        <div style={{ flex: 1 }}>{renderComponent()}</div>
      </div>
    </Card>
  );
};

export default Content;
