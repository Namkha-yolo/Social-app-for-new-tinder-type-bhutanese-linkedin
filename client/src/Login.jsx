// src/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate to the Chat page
import { Link } from 'react-router-dom'; // For linking to the Signup page

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
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <br />
        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />
        <br />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Log In</button>
      </form>
      <p>{message}</p>
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}

export default Login;
