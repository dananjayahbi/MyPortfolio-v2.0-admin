import React, { useState } from "react";
import { Typography, Divider, Button } from "antd";
import Author from "../components/contentSections/Author";
import AboutMe from "../components/contentSections/AboutMe";
import Skills from "../components/contentSections/Skills";

const { Title } = Typography;

const Content = () => {
    const [activeComponent, setActiveComponent] = useState('author');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'author':
                return <Author />;
            case 'aboutMe':
                return <AboutMe />;
            case 'skills':
                return <Skills />;
            default:
                return <Title level={3}>Select a component to view.</Title>;
        }
    };

    return (
        <div
            style={{
                margin: "auto",
                marginTop: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Title level={1} style={{ color: "#fff" }}>
                Portfolio Content Management
            </Title>
            <Divider />

            {/* Buttons for Component Selection */}
            <div style={{ marginBottom: "20px" }}>
                <Button onClick={() => setActiveComponent('author')}>Author Section</Button>
                <Button onClick={() => setActiveComponent('aboutMe')}>About Me Section</Button>
                <Button onClick={() => setActiveComponent('skills')}>Skills Section</Button>
            </div>

            {/* Render Selected Component */}
            {renderComponent()}
        </div>
    );
};

export default Content;
