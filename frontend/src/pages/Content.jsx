import React, { useState } from "react";
import { Typography, Divider, Button } from "antd";
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
            case 'currentlyIAm':
                return <CurrentlyIAm />;
            case 'myHobbies':
                return <MyHobbies />;
            case 'funFacts':
                return <FunFacts />;
            case 'experience':
                return <Experience />;
            case 'education':
                return <Education />;
            case 'contact':
                return <Contact />;
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
                <Button onClick={() => setActiveComponent('currentlyIAm')}>Currently I Am Section</Button>
                <Button onClick={() => setActiveComponent('myHobbies')}>My Hobbies Section</Button>
                <Button onClick={() => setActiveComponent('funFacts')}>Fun Facts Section</Button>
                <Button onClick={() => setActiveComponent('experience')}>Experience Section</Button>
                <Button onClick={() => setActiveComponent('education')}>Education Section</Button>
                <Button onClick={() => setActiveComponent('contact')}>Contact Section</Button>
            </div>

            {/* Render Selected Component */}
            {renderComponent()}
        </div>
    );
};

export default Content;
