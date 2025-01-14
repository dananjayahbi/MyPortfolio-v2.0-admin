import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Spin, Typography, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Dashboard = () => {
  const [mainProjectsCount, setMainProjectsCount] = useState(null);
  const [experimentalProjectsCount, setExperimentalProjectsCount] =
    useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch main projects count
        const mainProjectsResponse = await fetch(
          "http://localhost:3000/api/projects/main/read"
        );
        const mainProjectsData = await mainProjectsResponse.json();
        setMainProjectsCount(mainProjectsData.length); // Count objects in the response

        // Fetch experimental projects count
        const experimentalProjectsResponse = await fetch(
          "http://localhost:3000/api/projects/experimental/read"
        );
        const experimentalProjectsData =
          await experimentalProjectsResponse.json();
        setExperimentalProjectsCount(experimentalProjectsData.length); // Count objects in the response
      } catch (error) {
        message.error("Error fetching project data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="center">
        <Col span={24} md={12} lg={8}>
          <Card
            bordered={false}
            style={{
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <Title level={3}>Projects Dashboard</Title>

            {loading ? (
              <Spin indicator={antIcon} />
            ) : (
              <>
                <Statistic
                  title="Main Projects"
                  value={mainProjectsCount}
                  style={{ marginBottom: "16px" }}
                />
                <Statistic
                  title="Experimental Projects"
                  value={experimentalProjectsCount}
                />
              </>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
