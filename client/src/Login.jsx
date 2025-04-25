// src/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate to the Chat page
import { Link } from 'react-router-dom'; // For linking to the Signup page
import './Login.css';

function Login() {
  const [form, setForm] = useState({ email: '', phone: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // For redirecting to the Chat page

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      password: form.password,
    };

    if (form.email) loginData.email = form.email;
    if (form.phone) loginData.phone = form.phone;

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (res.ok) {
        // On successful login, save token in localStorage
        localStorage.setItem('token', data.token);
        setMessage('✅ Login successful!');
        navigate('/chat');  // Redirect to the Chat page
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      setMessage('Something went wrong. Try again.');
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Welcome Back</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="auth-input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="auth-input"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />
        <input
          className="auth-input"
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
        <button className="auth-button" type="submit">Log In</button>
      </form>
      <p className="auth-message">{message}</p>
      <p className="auth-footer">
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}

export default Login;
