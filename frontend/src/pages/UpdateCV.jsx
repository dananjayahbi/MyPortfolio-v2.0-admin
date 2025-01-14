import React, { useState } from 'react';
import { Upload, Button, message, Progress, Row, Col, Card, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const UpdateCV = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      message.error('Authentication token missing.');
      return;
    }

    if (fileList.length === 0) {
      message.warning('Please upload a file before submitting.');
      return;
    }

    setUploading(true);
    setUploadProgress(0); // Reset progress before starting upload

    const formData = new FormData();
    formData.append('file', fileList[0].originFileObj);

    try {
      const response = await fetch('http://localhost:3000/api/portfolio/cv/update', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        message.success('CV uploaded successfully!');
        setFileList([]);
        setUploadProgress(100); // Set progress to 100 when done
      } else {
        message.error('Failed to upload CV.');
        setUploadProgress(0); // Reset progress on failure
      }
    } catch (error) {
      message.error('An error occurred while uploading the CV.');
      setUploadProgress(0); // Reset progress on error
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList.slice(-1)); // Allow only one file at a time
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row justify="center">
        <Col span={24} md={12} lg={8}>
          <Card bordered={false} style={{ textAlign: 'center' }}>
            <Title level={3}>Update the CV</Title>

            <Upload
              beforeUpload={() => false} // Prevent automatic upload
              fileList={fileList}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
            >
              <Button icon={<UploadOutlined />} size="large" style={{ width: '100%' }}>
                Select CV File
              </Button>
            </Upload>

            {fileList.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                <Text strong>Selected File:</Text>
                <Text>{fileList[0].name}</Text>
              </div>
            )}

            {uploading && (
              <div style={{ marginTop: '20px' }}>
                <Progress
                  percent={uploadProgress}
                  status={uploadProgress === 100 ? 'success' : 'active'}
                  showInfo={false}
                />
              </div>
            )}

            <Button
              type="primary"
              onClick={handleUpload}
              style={{ marginTop: '10px' }}
              disabled={fileList.length === 0 || uploading}
              loading={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload CV'}
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateCV;
