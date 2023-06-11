import axios from 'axios';
function resizeImage(file, maxWidth, maxHeight) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        const resizedImageDataUrl = canvas.toDataURL('image/jpeg', 0.75);
        resolve(resizedImageDataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

const apiUrl = import.meta.env.VITE_API_URL;
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
      `${apiUrl}/accounts/publicacion/delete/`,
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
      `${apiUrl}/accounts/modificar/publicacion/`,
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
      `${apiUrl}/accounts/like/publicacion/`,
      body,
      config
    );
  } catch (err) {
    console.error('Error al crear el post:', err);
  }
}

export const crear_post = (descripcion, autor, imagen) => async (dispatch) => {
  const maxWidth = 800;
  const maxHeight = 800;
  const resizedImageDataUrl = await resizeImage(imagen, maxWidth, maxHeight);
  const formData = new FormData();
  formData.append('autor', autor);
  formData.append('descripcion', descripcion);
  formData.append('imagen', resizedImageDataUrl);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
    },
  };

  try {
    await axios.post(
      `${apiUrl}/accounts/crear/publicacion/`,
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
    const res = await axios.post(`${apiUrl}/accounts/publicaciones/${autor}/`, config);
    if (res.data) {
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
    const imageUrl = park.photos ? park.photos[0].getUrl() : 'https://deportesurbanos.com/wp-content/uploads/2020/03/Instalacion-Parque-Calistenia-DUCNT-122.jpg'
    // Crear parque de calistenia si no existe en la base de datos
    const parqueData = {
      placeId: park.place_id,
      nombre: park.name,
      descripcion: park.vicinity,
      imagenUrl: imageUrl,
    };

    const parqueBody = JSON.stringify(parqueData);
    try {
      await axios.post(`${apiUrl}/accounts/parque/create/`, parqueBody, config);
    } catch (err) {
      console.log('Error creando parque de calistenia:', err);
    }
  }
  const body = JSON.stringify({ parque });
  try {
    await axios.post(
      `${apiUrl}/accounts/parques/like/`,
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
    const imageUrl = park.photos ? park.photos[0].getUrl() : 'https://deportesurbanos.com/wp-content/uploads/2020/03/Instalacion-Parque-Calistenia-DUCNT-122.jpg'
    // Crear parque de calistenia si no existe en la base de dato
    const parqueData = {
      placeId: park.place_id,
      nombre: park.name,
      descripcion: park.vicinity,
      imagenUrl: imageUrl,
    };

    const parqueBody = JSON.stringify(parqueData);
    try {
      await axios.post(`${apiUrl}/accounts/parque/create/`, parqueBody, config);
    } catch (err) {
      console.log('Error creando parque de calistenia:', err);
    }
  }
  const body = JSON.stringify({ parque });
  try {
    await axios.post(
      `${apiUrl}/accounts/parques/dislike/`,
      body,
      config
    );
  } catch (err) {
    console.log(err);
  }

};