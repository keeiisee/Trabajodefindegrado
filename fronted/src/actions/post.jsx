import axios from 'axios';

export const eliminar_post = (publicacion_id) => async (dispatch) => {
  const body = JSON.stringify({ publicacion_id });
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };
  
  try {
    await axios.post(
      'http://localhost:8000/accounts/publicacion/delete/',
      body,
      config
    );
  } catch (err) {
    console.error('Error al crear el post:', err);
  }
}

export const modificar_post = (publicacion_id, descripcion) => async (dispatch) => {
  const body = JSON.stringify({ publicacion_id, descripcion });
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };
  
  try {
    await axios.post(
      'http://localhost:8000/accounts/modificar/publicacion/',
      body,
      config
    );
  } catch (err) {
    console.error('Error al crear el post:', err);
  }
}

export const post_like = (publicacion_id, like) => async (dispatch) => {
  const body = JSON.stringify({ publicacion_id, like });

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };

  try {
    await axios.post(
      'http://localhost:8000/accounts/like/publicacion/',
      body,
      config
    );
  } catch (err) {
    console.error('Error al crear el post:', err);
  }
}

export const crear_post = (descripcion, autor, imagen) => async (dispatch) => {
    const formData = new FormData();
    formData.append('autor', autor);
    formData.append('descripcion', descripcion);
    formData.append('imagen', imagen);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
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