// src/pages/Likes.jsx
import { useState, useEffect } from 'react';
import '../App.css';

function Likes() {
  const [likedPosts, setLikedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // This would fetch real liked posts in a full implementation
    // For now, we'll use sample data
    setTimeout(() => {
      setLikedPosts(getSampleLikedPosts());
      setIsLoading(false);
    }, 500);
  }, []);
  
  const handleUnlike = (postId) => {
    setLikedPosts(likedPosts.filter(post => post.id !== postId));
  };
  
  // Sample data for testing
  const getSampleLikedPosts = () => [
    {
      id: 2,
      text: 'Beautiful day for hiking! 🏔️ #nature #outdoors',
      author: 'Michael Chen',
      date: '2025-04-09T10:15:00Z',
      likes: 42,
      isLiked: true
    },
    {
      id: 5,
      text: 'Just discovered this amazing coffee shop downtown.',
      author: 'Emma Wilson',
      date: '2025-04-07T16:20:00Z',
      likes: 31,
      isLiked: true
    }
  ];
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  return (
    <div className="page-container">
      <h1>Posts You've Liked</h1>
      
      {isLoading ? (
        <div className="loading">Loading liked posts...</div>
      ) : likedPosts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">❤️</div>
          <h2>No liked posts yet</h2>
          <p>When you like posts, they will appear here.</p>
        </div>
      ) : (
        <div className="posts-container">
          {likedPosts.map(post => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div className="avatar">{post.author.charAt(0)}</div>
                <div className="post-meta">
                  <div className="post-author">{post.author}</div>
                  <div className="post-date">{formatDate(post.date)}</div>
                </div>
              </div>
              
              <div className="post-content">{post.text}</div>
              
              <div className="post-actions">
                <button 
                  onClick={() => handleUnlike(post.id)}
                  className="post-action liked"
                >
                  ❤️ {post.likes}
                </button>
                <button className="post-action">
                  💬 Comment
                </button>
                <button className="post-action">
                  🔄 Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Likes;