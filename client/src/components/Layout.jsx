// src/components/Layout.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import '../App.css';

function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo">
          <h2>MySocial</h2>
        </div>
        <nav className="nav-links">
          <NavLink 
            to="/feed" 
            className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="nav-icon">📰</span>
            <span>Feed</span>
          </NavLink>
          <NavLink 
            to="/likes" 
            className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="nav-icon">❤️</span>
            <span>Likes</span>
          </NavLink>
          <NavLink 
            to="/messages" 
            className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="nav-icon">💬</span>
            <span>Messages</span>
          </NavLink>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;