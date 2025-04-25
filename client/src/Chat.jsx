// src/Chat.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css'; // Import the CSS file for styling

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setStatus('');

    const res = await fetch('http://localhost:3000/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text: newMessage })
    });

    const data = await res.json();
    if (res.ok) {
      setMessages([data.data, ...messages]); // add new msg to top
      setNewMessage('');
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
    <div className="chat-container">
      <button onClick={handleLogout}>Logout</button>
      <div className="chat-header">
        <h2>Chat</h2>
      </div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <strong>{msg.sender?.name || 'Unknown'}:</strong> {msg.text}
            <br />
            <small>{new Date(msg.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <form className="chat-input-container" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="chat-input"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="chat-send-button">Send</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default Chat;
