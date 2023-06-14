import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const addLevel = (user_id) => async (dispatch) => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
    };

    const body = JSON.stringify({ user_id });
    console.log(body)
    try {
        await axios.put(`${apiUrl}/accounts/level_up/`, body, config);
    } catch (err) {
        console.log(err);
    }
};

// export const reduceExperience = (user_id, experience_to_add) => async (dispatch) => {
    
//     const config = {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `JWT ${localStorage.getItem('access')}`,
//         },
//     };

//     const body = JSON.stringify({ user_id, experience_to_add });
//     console.log(body)
//     try {
//         await axios.put(`${apiUrl}/accounts/reduce_experience`, body, config);
//     } catch (err) {
//         console.log(err);
//     }
// };