// src/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserProfile.css'; // Import the CSS file for styling

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
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">User Profile</h1>
      </div>
      <div className="profile-content">
        <img
          src={profile.profilePicture || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="profile-picture"
        />
        <h2 className="profile-name">{profile.name}</h2>
        <p className="profile-email">{profile.email}</p>
        <p className="profile-phone">{profile.phone}</p>
      </div>
      <div className="profile-footer">
        <button className="profile-button">Edit Profile</button>
        <button className="profile-button logout-button">Log Out</button>
      </div>
    </div>
  );
}

export default UserProfile;
