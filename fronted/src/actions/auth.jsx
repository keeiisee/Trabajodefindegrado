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
export const removeFriend = (recipient_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };
    const body = JSON.stringify({ recipient_id: recipient_id });
    try {
        await axios.post(`http://localhost:8000/accounts/remove_friend/`, body, config);

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
        const res = await axios.get(`http://localhost:8000/accounts/last_friend_posts/`, config);
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
        await axios.post(`http://localhost:8000/accounts/add_friend/`, body, config);

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
        await axios.post(`http://localhost:8000/accounts/send_friend/`, body, config);

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
        await axios.post(`http://localhost:8000/accounts/reject_friend/`, body, config);

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
        const res = await axios.get(`http://localhost:8000/accounts/users/${palabra}/`, config);
        if (res.data != []) {
            return res.data
        } else {
            return []
        }
    } catch (err) {

    }
}

export const modificar_perfil = (imagen, descripcion, user,edad, telefono, privado) => async dispatch => {
    const base64Image = await convertImageToBase64(imagen);
    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('descripcion', descripcion);
    formData.append('edad', edad);
    formData.append('telefono', telefono);
    formData.append('is_private', privado);

    if (imagen !== null) {
        formData.append('imagen', base64Image);
    }

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };
    try {
        await axios.put(`http://localhost:8000/accounts/modificar/perfil/`, formData, config);
    } catch (error) {
        console.log(error);
    }
}
export const crear_perfil = (imagen, descripcion, telefono, user, edad, privado) => async dispatch => {
    const base64Image = await convertImageToBase64(imagen);
    const formData = new FormData();
    formData.append('user', user.id);
    formData.append('descripcion', descripcion);
    formData.append('imagen', base64Image);
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
        await axios.post(`http://localhost:8000/accounts/crear/perfil/`, formData, config);
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
        await axios.post(`http://127.0.0.1:8000/auth/users/reset_password_confirm/`, body, config);

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
        const res = await axios.post(`http://127.0.0.1:8000/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
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
        await axios.post(`http://127.0.0.1:8000/auth/users/activation/`, body, config);

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
            const res = await axios.post(`http://127.0.0.1:8000/auth/jwt/verify`, body, config)

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
        await axios.post(`http://127.0.0.1:8000/auth/users/reset_password/`, body, config);

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
            const res = await axios.get(`http://127.0.0.1:8000/auth/users/me/`, config);
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
        await axios.post(`http://localhost:8000/accounts/delete/user/`, null, config);
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
        const res = await axios.get(`http://localhost:8000/accounts/profile/`, config);
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
        const res = await axios.get(`http://localhost:8000/accounts/profile/`, config);

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
        const res = await fetch("http://127.0.0.1:8000/auth/jwt/create/", config);
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