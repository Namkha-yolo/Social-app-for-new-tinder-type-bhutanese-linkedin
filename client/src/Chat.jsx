// src/Chat.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  // Fetch messages on load
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch('http://localhost:3000/api/messages', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok) {
        setMessages(data);
      } else {
        setStatus('❌ Could not fetch messages.');
      }
    };

    fetchMessages();
  }, [token]);

  const handleSend = async (e) => {
    e.preventDefault();
    setStatus('');

    const res = await fetch('http://localhost:3000/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    if (res.ok) {
      setMessages([data.data, ...messages]); // add new msg to top
      setText('');
      setStatus('✅ Message sent!');
    } else {
      setStatus(`❌ ${data.error}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '2rem' }}>
      <button onClick={handleLogout}>Logout</button>
      <h2>Chat</h2>
      <form onSubmit={handleSend}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a message..."
          style={{ width: '80%' }}
        />
        <button type="submit">Send</button>
      </form>
      <p>{status}</p>

      <div>
        {messages.map((msg) => (
          <div key={msg._id} style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>
            <strong>{msg.sender?.name || 'Unknown'}:</strong> {msg.text}
            <br />
            <small>{new Date(msg.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
