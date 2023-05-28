import axios from 'axios';

export const crear_post = (descripcion, autor, imagen, logros) => async (dispatch) => {
    const formData = new FormData();
    formData.append('autor', autor);
    formData.append('descripcion', descripcion);
    formData.append('imagen', imagen);
  
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `JWT ${localStorage.getItem('access')}`,
      },
    };
  
    try {
      await axios.post(
        'http://localhost:8000/accounts/crear/publicacion/',
        formData,
        config
      );
    } catch (err) {
      console.error('Error al crear el post:', err);
    }
}

export const ver_post_profile_por_id = (autor) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    }
    try {
        const res = await axios.post(`http://localhost:8000/accounts/publicaciones/${autor}/`, config);
        if (res.data){
            console.log(res)
            return res
        }
    } catch (err) {
    
    }
}