// src/Feed.jsx
import { useState, useEffect } from 'react';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(data);
      } else {
        setMessage('❌ Error fetching posts.');
      }
    } catch (error) {
      console.error('Fetch posts error:', error);
      setMessage('Something went wrong while fetching posts.');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);

  // Function to handle liking a post
  const handleLike = async (postId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${postId}/like`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchPosts(); // Refresh posts after like
      }
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  // Function to handle adding a comment
  const handleComment = async (postId, commentText) => {
    if (!commentText) return;
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: commentText })
      });
      if (res.ok) {
        fetchPosts(); // Refresh posts after adding comment
      }
    } catch (err) {
      console.error('Comment error:', err);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '2rem' }}>
      <h2>Feed</h2>
      {message && <p>{message}</p>}
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
            <img src={post.imageUrl} alt="post" style={{ width: '100%' }} />
            <p>{post.caption}</p>
            <p>
              <strong>
                <a href={`/users/${post.user?._id}`}>{post.user?.name || 'Unknown'}</a>
              </strong>
              {" "} - {new Date(post.createdAt).toLocaleString()}
            </p>
            <p>Likes: {post.likes ? post.likes.length : 0}</p>
            <button onClick={() => handleLike(post._id)}>Like/Unlike</button>
            <div>
              <h4>Comments</h4>
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <div key={comment._id} style={{ borderTop: '1px solid #eee', paddingTop: '0.5rem' }}>
                    <strong>{comment.user?.name || 'Anon'}:</strong> {comment.text}
                  </div>
                ))
              ) : (
                <p>No comments.</p>
              )}
              {/* Here you might add an input field to type and submit a new comment */}
              {/* For example, you can integrate a small comment form per post */}
            </div>
          </div>
        ))
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
}

export default Feed;
