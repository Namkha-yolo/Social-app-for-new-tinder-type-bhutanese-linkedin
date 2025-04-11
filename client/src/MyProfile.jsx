// src/MyProfile.jsx
import { useState, useEffect } from 'react';

function MyProfile() {
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch your own profile data from the backend.
    // You need a new endpoint such as GET /api/users/me
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setProfile(data);
        } else {
          setMessage('Error fetching profile.');
        }
      } catch (err) {
        console.error(err);
        setMessage('Error fetching profile.');
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Profile updated successfully!');
      } else {
        setMessage(data.error);
      }
    } catch (err) {
      console.error(err);
      setMessage('Error updating profile.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '2rem' }}>
      <h2>My Profile</h2>
      <form onSubmit={handleSave}>
        <input name="name" placeholder="Name" value={profile.name} onChange={handleChange} /><br />
        <input name="email" placeholder="Email" value={profile.email} onChange={handleChange} /><br />
        <input name="phone" placeholder="Phone" value={profile.phone} onChange={handleChange} /><br />
        <button type="submit">Save Changes</button>
      </form>
      {message && <p>{message}</p>}
      {/* You might also list your posts here */}
    </div>
  );
}

export default MyProfile;
