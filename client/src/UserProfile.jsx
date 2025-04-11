// src/UserProfile.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setProfile(data);
        } else {
          setMessage('Error fetching user profile.');
        }
      } catch (err) {
        console.error(err);
        setMessage('Error fetching user profile.');
      }
    };
    fetchProfile();
  }, [id, token]);

  if (!profile) return <p>{message || 'Loading...'}</p>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '2rem' }}>
      <h2>{profile.name}'s Profile</h2>
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phone}</p>
      {/* Display user's posts */}
      {/* You could fetch posts separately by the userId */}
    </div>
  );
}

export default UserProfile;
