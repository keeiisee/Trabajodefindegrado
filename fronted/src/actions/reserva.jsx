import axios from "axios";

export const crear_reserva = (parque, fecha, hora, materiales) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };
    const body = JSON.stringify({ parque, fecha, hora, materiales });
    try {
        await axios.post(`http://localhost:8000/accounts/reserva/view/`, body, config);

    } catch (err) {
        console.log(err)
    }
}
