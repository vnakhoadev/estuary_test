import React from 'react';
import PostItem from './PostItem';

function PostList({ posts, updatePost, deletePost, addComment }) {
  return (
    <div style={{ marginTop: "50px" }}>
      <h2 style={{ textAlign: 'center' }}>List Posts</h2>
      {posts?.map(post => (
        < PostItem
          key={post.id}
          post={post}
          updatePost={updatePost}
          deletePost={deletePost}
          addComment={addComment}
        />
      ))}
    </div>
  );
}

export default PostList;
