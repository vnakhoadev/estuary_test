import React, { useState } from 'react';

function CreateComment({ addComment, post }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    const newComment = { text, postId: post.id };
    console.log(">>>>>>>>>>>>>>>TEXT: ", newComment)
    addComment(newComment);
    setText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: "5px", marginBottom: "10px", display: 'flex' }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write comment"
        style={{ outline: 'none', padding: "10px 5px", flex: '1' }}
      />
      <button className='commentBtn' type="submit">Comment</button>
    </form>
  );
}

export default CreateComment;
