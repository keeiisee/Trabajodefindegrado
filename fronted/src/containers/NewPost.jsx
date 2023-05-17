import React, { useState } from 'react';
import {createPost} from '../components/createPost';
import Navbar from '../components/Navbar';

function NewPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { title, content, image };
    createPost(data)
      .then((response) => {
        console.log(response.data);
        // Realizar cualquier otra acción necesaria después de crear el post
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <>
    <Navbar></Navbar>
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Título:</label>
      <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label htmlFor="content">Contenido:</label>
      <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />

      <label htmlFor="image">Imagen:</label>
      <input type="file" id="image" accept="image/*" onChange={handleImageChange} />

      <button type="submit">Crear post</button>
    </form>
    </>
    
  );
}

export default NewPostForm;