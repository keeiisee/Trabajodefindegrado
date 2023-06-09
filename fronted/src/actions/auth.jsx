import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    PROFILE_CREATE_SUCCES,
    PROFILE_CREATE_FAIL,
    PROFILE_LOADED_SUCCES,
    PROFILE_LOADED_FAIL,
} from './types';
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

export const removeFriend = (recipient_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };
    const body = JSON.stringify({ recipient_id: recipient_id });
    try {
        await axios.post(`${apiUrl}/accounts/remove_friend/`, body, config);

    } catch (err) {
        console.log(err)
    }
}
export const publicaionesAmigos = () => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }
    try {
        const res = await axios.get(`${apiUrl}/accounts/last_friend_posts/`, config);
        if (res.data != []) {
            return res.data
        } else {
            return []
        }
    } catch (err) {

    }
}
export const addFriend = (recipient_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };
    const body = JSON.stringify({ recipient_id: recipient_id });
    try {
        await axios.post(`${apiUrl}/accounts/add_friend/`, body, config);

    } catch (err) {
        console.log(err)
    }
}

export const sendFriend = (recipient_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    const body = JSON.stringify({ recipient_id: recipient_id });
    try {
        await axios.post(`${apiUrl}/accounts/send_friend/`, body, config);

    } catch (err) {
        console.log(err)
    }
}

export const rejectFriend = (recipient_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };
    const body = JSON.stringify({ recipient_id: recipient_id });
    try {
        await axios.post(`${apiUrl}/accounts/reject_friend/`, body, config);

    } catch (err) {
        console.log(err)
    }
}

export const load_personas = (palabra) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }
    try {
        const res = await axios.get(`${apiUrl}/accounts/users/${palabra}/`, config);
        if (res.data != []) {
            return res.data
        } else {
            return []
        }
    } catch (err) {

    }
}

export const modificar_perfil = (imagen, descripcion, user, edad, telefono, privado) => async dispatch => {

    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('descripcion', descripcion);
    formData.append('edad', edad);
    formData.append('telefono', telefono);
    formData.append('is_private', privado);
    if (imagen !== null) {
        const maxWidth = 800;
        const maxHeight = 800;
        const resizedImageDataUrl = await resizeImage(imagen, maxWidth, maxHeight);
        formData.append('imagen', resizedImageDataUrl);
      }
    
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };
    try {
        await axios.put(`${apiUrl}/accounts/modificar/perfil/`, formData, config);
    } catch (error) {
        console.log(error);
    }
}
export const crear_perfil = (imagen, descripcion, telefono, user, edad, privado) => async dispatch => {
    const maxWidth = 800;
    const maxHeight = 800;
    const resizedImageDataUrl = await resizeImage(imagen, maxWidth, maxHeight);
    const formData = new FormData();
    formData.append('user', user.id);
    formData.append('descripcion', descripcion);
    formData.append('imagen', resizedImageDataUrl);
    formData.append('edad', edad);
    formData.append('telefono', telefono);
    formData.append('is_private', privado);

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `JWT ${localStorage.getItem('access')}`,
        }
    };
    try {
        await axios.post(`${apiUrl}/accounts/crear/perfil/`, formData, config);
        dispatch({
            type: PROFILE_CREATE_SUCCES
        });

    } catch (err) {
        dispatch({
            type: PROFILE_CREATE_FAIL
        });
    }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${apiUrl}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};
export const signup = (name, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, password, re_password });

    try {
        const res = await axios.post(`${apiUrl}/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        const errorMessage = {};

        if (err.response && err.response.data) {
            if (err.response.data.email) {
                errorMessage.email = 'El correo electrónico ya está en uso.';
            }
            if (err.response.data.name) {
                errorMessage.name = 'El nombre de usuario ya está en uso.';
            }
        }

        dispatch({
            type: SIGNUP_FAIL,
            payload: { ...errorMessage, success: false },
        });
        return Promise.reject();
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${apiUrl}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
};

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post(`${apiUrl}/auth/jwt/verify`, body, config)

            if (res.data.code !== 'token_not_valid') {
                load_profile()
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};
export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email });
    try {
        await axios.post(`${apiUrl}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${apiUrl}/auth/users/me/`, config);
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};
export const deleted_user = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    }

    try {
        await axios.post(`${apiUrl}/accounts/delete/user/`, null, config);
        dispatch({
            type: LOGOUT
        });
    } catch (err) {
        console.log(err)
    }
}

export const load_Idprofile = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    }
    try {
        const res = await axios.get(`${apiUrl}/accounts/profile/`, config);
        if (res.data.length !== 0) {
            return res.data
        }
    } catch (err) {
        console.log(err)
    }
}
export const load_profile = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    }
    try {
        const res = await axios.get(`${apiUrl}/accounts/profile/`, config);

        if (res.data.length !== 0) {
            dispatch({
                type: PROFILE_LOADED_SUCCES,
                payload: true
            });
        } else {
            dispatch({
                type: PROFILE_LOADED_FAIL,
            });
        }
    } catch (err) {
        dispatch({
            type: PROFILE_LOADED_FAIL,
        });
    }
}
export const login = (email, password) => async dispatch => {
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    };

    try {
        const res = await fetch(`${apiUrl}/auth/jwt/create/`, config);
        const data = await res.json();

        if (res.ok) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            });
            dispatch(load_user());
            dispatch(load_profile())
        } else {
            dispatch({
                type: LOGIN_FAIL,
                payload: "Las credenciales proporcionadas no corresponden a ningún usuario."
            });
        }
    } catch (err) {

        const errors = err.response.data;
        if (errors) {
            dispatch({
                type: LOGIN_FAIL,
                payload: "Las credenciales proporcionadas no corresponden a ningún usuario."
            });
        }
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};