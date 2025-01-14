import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const ProjectByUploadExp = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Button type="primary" onClick={goBack}>
        Back
      </Button>{" "}
      <br /> <br />
      <div>To Be Developed ... (Use URLs instead)</div>
    </div>
  );
};

export default ProjectByUploadExp;
