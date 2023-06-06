import axios from 'axios';
function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}
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
  const base64Image = await convertImageToBase64(imagen);
  const formData = new FormData();
  formData.append('autor', autor);
  formData.append('descripcion', descripcion);
  formData.append('imagen', base64Image);
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
    if (res.data) {
      console.log(res)
      return res
    }
  } catch (err) {

  }
}

export const like_post = (park, enBD) => async (dispatch) => {
  const parque = park.place_id;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
    },
  };

  if (!enBD) {
    // Crear parque de calistenia si no existe en la base de datos
    console.log(park)
    const parqueData = {
      placeId: park.place_id,
      nombre: park.name,
      descripcion: park.vicinity,
      imagenUrl: park.photos[0].getUrl(),
    };

    const parqueBody = JSON.stringify(parqueData);
    try {
      await axios.post('http://localhost:8000/accounts/parque/create/', parqueBody, config);
    } catch (err) {
      console.log('Error creando parque de calistenia:', err);
    }
  }
  console.log(parque)
  const body = JSON.stringify({ parque });
  try {
    await axios.post(
      `http://localhost:8000/accounts/parques/like/`,
      body,
      config
    );
  } catch (err) {
    console.log(err);
  }

};

export const dislike_post = (park, enBD) => async (dispatch) => {
  const parque = park.place_id;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
    },
  };

  if (!enBD) {
    // Crear parque de calistenia si no existe en la base de dato
    const parqueData = {
      placeId: park.place_id,
      nombre: park.name,
      descripcion: park.vicinity,
      imagenUrl: park.photos[0].getUrl(),
    };

    const parqueBody = JSON.stringify(parqueData);
    try {
      await axios.post('http://localhost:8000/accounts/parque/create/', parqueBody, config);
    } catch (err) {
      console.log('Error creando parque de calistenia:', err);
    }
  }
  console.log(parque)
  const body = JSON.stringify({ parque });
  try {
    await axios.post(
      `http://localhost:8000/accounts/parques/dislike/`,
      body,
      config
    );
  } catch (err) {
    console.log(err);
  }

};