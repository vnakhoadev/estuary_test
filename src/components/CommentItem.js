import React, { useState } from 'react';

function CommentItem({ post, comment, updateComment, deleteComment }) {

  const [currentValueComment, setCurrentValueComment] = useState(comment?.text);

  const [isDisable, setIsDisable] = useState(true);

  const handleUpdateComment = () => {
    setIsDisable(false)
  };

  const handleUpdateDone = async (commentUpdate, updateCommentId) => {
    updateComment(commentUpdate, updateCommentId);

    console.log(">>>>>>DT: ", commentUpdate)

    try {
      const response = await fetch(`http://localhost:3000/api/comment/${updateCommentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentUpdate),
      });

      if (!response.ok) {
        throw new Error('Network update response was not ok');
      }
      // window.location.reload();

    } catch (error) {
      console.error('Error updating post:', error);
    }

    setIsDisable(true)
  };

  return (
    <div className='commentItem'>
      <div className='commentItemDetail'>
        <span style={{ fontWeight: 'bold' }}>User: </span>
        {
          isDisable ?
            <p style={{ wordBreak: 'break-word' }}>{comment?.text} </p>
            : null
        }
        <input
          className={`${isDisable ? " displayNone " : "commnentContent"}`}
          disabled={isDisable}
          onChange={(e) => setCurrentValueComment(e.target.value)}
          value={currentValueComment}
        />
      </div>
      <div className='commentEdit'>
        {
          isDisable ?
            <>
              <button className='commentItemBtn' onClick={() => handleUpdateComment(comment.id)}>Edit</button>
              <button className='commentItemBtn' onClick={() => deleteComment(comment.id)}>Remove</button>
            </>
            : <button className='commentItemBtn' onClick={() => handleUpdateDone({ postId: post.id, text: currentValueComment }, comment.id)}>Done</button>
        }
      </div>
    </div>
  );
}

export default CommentItem;
