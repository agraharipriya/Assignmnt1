import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file for styling

function CommentFilterApp() {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/comments')
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const filteredComments = comments.filter(
    (comment) => comment.postId.toString() === filter
  );

  return (
    <div className="app">
      <div className="left-panel">
        <h2>Posts</h2>
        <input
          type="text"
          placeholder="Filter by postId"
          value={filter}
          onChange={handleFilterChange}
        />
        <ul>
          {comments.map((comment) => (
            <li
              key={comment.id}
              onClick={() => handlePostClick(comment)}
              className={
                selectedPost && selectedPost.id === comment.id
                  ? 'selected-post'
                  : ''
              }
            >
              {comment.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="right-panel">
        <h2>Comments</h2>
        {selectedPost ? (
          <div>
            <h3>{selectedPost.name}</h3>
            <p>{selectedPost.body}</p>
            <ul>
              {filteredComments.map((comment) => (
                <li key={comment.id}>{comment.body}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Select a post to view comments</p>
        )}
      </div>
    </div>
  );
}

export default CommentFilterApp;
