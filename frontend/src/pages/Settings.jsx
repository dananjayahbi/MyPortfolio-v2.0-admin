import React, { useState } from 'react';

const Settings = () => {
  const [postText, setPostText] = useState('');

  const handleInputChange = (event) => {
    setPostText(event.target.value);
  };

  const handleSubmit = async () => {
    const token = sessionStorage.getItem('token'); // Get the token from session storage

    if (!token) {
      alert('Authentication token not found. Please log in.');
      return;
    }

    const body = {
      author: {
        post: postText,
      },
    };

    try {
      const response = await fetch('http://localhost:3000/api/portfolio/content/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add the authentication header
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Response:', result);
      alert('Post updated successfully!');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post.');
    }
  };

  return (
    <div>
      <h2>Settings</h2>
      <input
        type="text"
        value={postText}
        onChange={handleInputChange}
        placeholder="Enter your post text"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Settings;
