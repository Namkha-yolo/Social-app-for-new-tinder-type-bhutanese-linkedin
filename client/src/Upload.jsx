// src/Upload.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage('Please select an image file.');
      return;
    }
    const formData = new FormData();
    formData.append('image', selectedFile);  // Field name "image" must match backend configuration
    formData.append('caption', caption);

    try {
      const res = await fetch('http://localhost:3000/api/posts/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
          // Do not set Content-Type manually
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Post uploaded successfully!');
        setSelectedFile(null);
        setCaption('');
        // Optionally, redirect to the feed page after upload:
        setTimeout(() => navigate('/feed'), 2000);
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('Error uploading post.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '2rem' }}>
      <h2>Upload Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          style={{ marginBottom: '0.5rem' }}
        /><br />
        <textarea
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
        /><br />
        <button type="submit">Upload Post</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Upload;
