import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Typography, Card } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;

const AboutMe = () => {
    const [form] = Form.useForm();
    const [aboutMe, setAboutMe] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/portfolio/content/get');
                const data = await response.json();
                setAboutMe(data.aboutMe);
                form.setFieldsValue(data.aboutMe);
            } catch (error) {
                message.error('Failed to fetch About Me data.');
            }
        };

        fetchData();
    }, [form]);

    const handleUpdateAboutMe = async (values) => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            message.error('Authentication token is missing.');
            return;
        }

        setLoading(true);

        const updatedValues = { aboutMe: values };

        try {
            const response = await fetch('http://localhost:3000/api/portfolio/content/update', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedValues)
            });

            if (response.ok) {
                message.success('About Me details updated successfully!');
            } else {
                message.error('Failed to update About Me details.');
            }
        } catch (error) {
            message.error('An error occurred while updating About Me details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card style={{ maxWidth: '600px', margin: 'auto', marginTop: '50px' }}>
            <Title level={2}>Update About Me Section</Title>
            <Form form={form} layout="vertical" onFinish={handleUpdateAboutMe}>
                <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the title' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter the description' }]}>
                    <TextArea rows={4} />
                </Form.Item>
                
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {loading ? 'Updating...' : 'Update About Me'}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default AboutMe;
