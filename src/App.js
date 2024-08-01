import React, { useState, useEffect } from 'react';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';

import "./global.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(">>>>>>>DATA: ", data.data)
      setPosts(data.data);

    } catch (error) {
      console.error(error)
    };
  };

  useEffect(() => {
    fetchPosts();
  }, [])

  const addPost = async (post, updatedPostId) => {
    if (updatedPostId) {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${updatedPostId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post),
        });

        if (!response.ok) {
          throw new Error('Network update response was not ok');
        }
        fetchPosts();

      } catch (error) {
        console.error('Error updating post:', error);
      }
    }
    else {
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post),
        });

        if (!response.ok) throw new Error('Network post response was not ok');
        fetchPosts();

      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  const updatePost = async (updatedPostId) => {
    const editData = posts.filter(item => item.id === updatedPostId)[0];
    if (!editData) throw new Error('Not found this Post');
    setEditPost(editData);
  };

  const deletePost = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network delete response was not ok');
      }
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const addComment = async (comment) => {

    try {
      const res = await fetch('http://localhost:3000/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });

      if (!res.ok) throw new Error('Network comment response was not ok');

      await fetchPosts();
      window.location.reload()

    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <>
      <CreatePost addPost={addPost} editPost={editPost} setEditPost={setEditPost} />
      <PostList posts={posts} updatePost={updatePost} deletePost={deletePost} addComment={addComment} />
    </>
  );
};

export default App;
