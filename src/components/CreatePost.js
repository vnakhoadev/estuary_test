import React, { useEffect, useState } from 'react';

function CreatePost({ addPost, editPost, setEditPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    setTitle(editPost?.title);
    setContent(editPost?.content);
  }, [editPost])

  const handleSubmit = (e, id) => {
    e.preventDefault();
    if (!title || !content) return;
    const newPost = { title, content };

    console.log(">>>> add : ", newPost, 'id: ', id); ////////////////////////

    addPost(newPost, id);
    setTitle('');
    setContent('');
    setEditPost(null);
  };

  return (
    <>
      <h2>Create Post</h2>
      <form onSubmit={(e) => handleSubmit(e, editPost?.id)} className='createpost'>
        <input
          style={{ display: 'block', width: "50%", marginBottom: '10px', outline: 'none', padding: '5px' }}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          style={{ display: "block", width: "50%", marginBottom: '10px', outline: 'none', padding: '5px' }}
        />
        <button
          type="submit" style={{ cursor: "pointer" }}
        >
          {editPost ? "Save" : "Post"}
        </button>
      </form>
    </>
  );
}

export default CreatePost;
