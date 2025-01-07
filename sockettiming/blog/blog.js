import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch blog posts from backend
    axios.get("http://localhost:5000/api/posts")
      .then(response => setPosts(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (postId) => {
    axios.post(`http://localhost:5000/api/posts/${postId}/comments`, { text: newComment })
      .then(response => {
        setPosts(posts.map(post => post._id === postId ? response.data : post));
        setNewComment("");
      })
      .catch(error => console.log(error));
  };

  const handleLike = (postId) => {
    axios.post(`http://localhost:5000/api/posts/${postId}/like`)
      .then(response => {
        setPosts(posts.map(post => post._id === postId ? response.data : post));
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="App">
      <h1>Blog App</h1>
      {posts.map(post => (
        <div key={post._id} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <button onClick={() => handleLike(post._id)}>Like ({post.likes})</button>
          <div className="comments">
            <h3>Comments:</h3>
            {post.comments.map(comment => (
              <p key={comment._id}>{comment.text}</p>
            ))}
            <input 
              type="text" 
              value={newComment} 
              onChange={handleCommentChange} 
              placeholder="Add a comment"
            />
            <button onClick={() => handleCommentSubmit(post._id)}>Post Comment</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/blogApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Blog post schema
const commentSchema = new mongoose.Schema({
  text: String
});
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  likes: { type: Number, default: 0 },
  comments: [commentSchema]
});

const Post = mongoose.model('Post', postSchema);

// API endpoints

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Add comment to post
app.post('/api/posts/:postId/comments', async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;
  try {
    const post = await Post.findById(postId);
    post.comments.push({ text });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Like a post
app.post('/api/posts/:postId/like', async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    post.likes += 1;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
