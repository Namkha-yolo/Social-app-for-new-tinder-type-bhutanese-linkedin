// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import ProtectedLayout from './ProtectedLayout';
// Protected components:
import Feed from './Feed';
import Upload from './Upload';
import MyProfile from './MyProfile';
import UserProfile from './UserProfile';
import Chat from './Chat';
import UserSearch from './UserSearch';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes that include the NavBar */}
        <Route element={<ProtectedLayout />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<MyProfile />} /> {/* Your own profile */}
          <Route path="/users/:id" element={<UserProfile />} /> {/* Other users' profiles */}
          <Route path="/chat" element={<Chat />} />
          <Route path="/search" element={<UserSearch />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
