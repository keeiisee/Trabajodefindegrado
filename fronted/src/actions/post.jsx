import axios from 'axios';

export const crear_post = (descripcion, autor, imagen, logros) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    }
    const body = JSON.stringify({ autor, descripcion });
    try {
        await axios.post(`http://localhost:8000/accounts/publicacion/create/`, body, config);
        
    } catch (err) {
    
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