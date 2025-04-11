// src/Signup.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import both useNavigate and Link

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // For redirection

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Signup successful! Redirecting to Login...');
        setTimeout(() => {
          navigate('/'); // Redirect to the Login page after 2 seconds
        }, 2000);
        setForm({ name: '', email: '', phone: '', password: '' });
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      setMessage('Something went wrong. Try again.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        /><br />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        /><br />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        /><br />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
        /><br />
        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
      <p>
        Already have an account? <Link to="/">Return to Login</Link>
      </p>
    </div>
  );
}

export default Signup;
