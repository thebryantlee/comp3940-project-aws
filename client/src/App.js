import './App.css';
import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Prepare the form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      // TODO: Replace with your server endpoint
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      // Handle the server response
      if (response.ok) {
        const responseBody = await response.json();
        console.log('File uploaded successfully', responseBody);
      } else {
        console.error('Server responded with a non-200 status code', response.status);
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter title"
          />
          <input
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter description"
          />
          <input
            type="file"
            onChange={handleFileChange}
          />
          <button type="submit">Upload</button>
        </form>
      </header>
    </div>
  );
}


export default App;
