// src/NavBar.jsx
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#f8f8f8',
        padding: '10px 20px',
        borderBottom: '1px solid #ccc',
        marginBottom: '20px'
      }}>
      <div>
        <Link to="/feed" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>
          Feed
        </Link>
        <Link to="/upload" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>
          Upload
        </Link>
        <Link to="/profile" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>
          Profile
        </Link>
        <Link to="/chat" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>
          Messages
        </Link>
        <Link to="/search" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>
          Search
        </Link>
      </div>
      <div>
        <button onClick={handleLogout} style={{ padding: '5px 10px', fontSize: '16px' }}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
