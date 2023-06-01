import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../provider/UserContext';


const ModificarPostForm = ({imagen}) => {
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { closePostM } = useContext(UserContext);
    const [formData, setFormData] = useState({
        descripcion: ""
    });
    const { descripcion } = formData;

    const onSubmit = event => {
        event.preventDefault();
       
        navigate('/profile/mispublicaciones');
    };
    function sacarAvisoEliminar(){
        return ""
    }
    return (

        <>
            <div
                className="fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
                id="loginModal"
            >
                <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                    <h2 className="text-2xl font-semibold mb-4">Modificar Post</h2>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="mb-3">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="password"
                            >
                                Descripcion
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="descripcion"
                                type='text'
                                placeholder='Descripcion'
                                name='descripcion'
                                value={descripcion}
                                onChange={e => onChange(e)}
                                minLength='6'
                                required
                            />
                        </div>
                        <button
                            className="mb-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                            type="button"
                            onClick={(e) => { sacarAvisoEliminar(e) }}
                        >Eliminar Post</button>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={closePostM}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Crear Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ModificarPostForm