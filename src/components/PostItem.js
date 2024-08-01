import React, { useState } from 'react';
import CommentList from './CommentList';
import CreateComment from './CreateComment';

function PostItem({ post, updatePost, deletePost, addComment }) {
  const [comments, setComments] = useState(post.comment || []);

  const updateComment = async (commentUpdate, updateCommentId) => {
    setComments(comments.map(comment => comment.id === updateCommentId ? commentUpdate : comment));
  };

  const handleUpdatePost = (updatedPostId) => {
    updatePost(updatedPostId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteComment = async (id) => {
    setComments(comments.filter(comment => comment.id !== id));

    try {
      const response = await fetch(`http://localhost:3000/api/comment/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network update response was not ok');
      }
      // window.location.reload();

    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <div className='post'>
        <div>
          <h2 className='postTitle'>{post.title}</h2>
          <p style={{ wordBreak: "break-word" }}>{post.content}</p>
          <button className='postBtn'
            onClick={() => handleUpdatePost(post.id)}
          >
            Edit
          </button>
          <button className='postBtn postBtnDeletePost'
            onClick={() => deletePost(post.id)}
          >
            Delete
          </button>
        </div>
        <div>
          <div className='editCommentItemBtn'>
            <div>
              <CreateComment addComment={addComment} post={post} />
              <CommentList post={post} comments={comments} updateComment={updateComment} deleteComment={deleteComment} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
