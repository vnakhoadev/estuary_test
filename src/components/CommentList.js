import React from 'react';
import CommentItem from './CommentItem';

function CommentList({ comments, updateComment, deleteComment, post }) {
  return (
    <div>
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          updateComment={updateComment}
          deleteComment={deleteComment}
          post={post}
        />
      ))}
    </div>
  );
}

export default CommentList;
