// src/ProtectedLayout.jsx
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function ProtectedLayout() {
  return (
    <div>
      <NavBar />
      {/* Outlet renders the matched child route */}
      <Outlet />
    </div>
  );
}

export default ProtectedLayout;
