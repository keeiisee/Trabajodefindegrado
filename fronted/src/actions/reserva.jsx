import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const crear_reserva = (park, fecha, hora, materiales, enBD) => async (dispatch) => {
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

    const body = JSON.stringify({ parque, fecha, hora, materiales });
    console.log(body)
    try {
        await axios.post(`${apiUrl}/accounts/reserva/view/`, body, config);
    } catch (err) {
        console.log(err);
    }
};

export const deleted_reserva = (id) => async (dispatch) => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
    };

    const body = JSON.stringify({ id });
    console.log(body)
    try {
        await axios.post(`${apiUrl}/accounts/reservasDeleted/`, body, config);
    } catch (err) {
        console.log(err);
    }
};
