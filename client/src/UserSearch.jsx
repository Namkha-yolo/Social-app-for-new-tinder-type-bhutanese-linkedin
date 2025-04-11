// src/UserSearch.jsx
import { useState } from 'react';

function UserSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setResults([]);
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/users/search?q=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        setMessage('Error searching for users.');
        return;
      }
      const data = await res.json();
      setResults(data);
      setMessage('');
    } catch (err) {
      console.error("Search error:", err);
      setMessage('Error fetching search results.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '2rem' }}>
      <h2>User Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for users by name or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Search
        </button>
      </form>
      {message && <p>{message}</p>}
      <div>
        {results && results.length > 0 ? (
          results.map(user => (
            <div key={user._id} style={{ borderBottom: '1px solid #ccc', padding: '1rem 0' }}>
              <p><strong>{user.name}</strong></p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </div>
          ))
        ) : (
          query && <p>No users found matching "{query}"</p>
        )}
      </div>
    </div>
  );
}

export default UserSearch;
