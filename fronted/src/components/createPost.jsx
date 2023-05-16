import axios from 'axios';

// Función para crear un nuevo post
export const createPost = (data) => {
  const config = {
    headers: { 'Authorization': `JWT ${localStorage.getItem('access')}`, }
  };
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  if (data.image) {
    formData.append('image', data.image);
  }
  return axios.post('http://127.0.0.1:8000/posts/create/', formData, config);
};
export default createPost