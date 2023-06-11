import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../provider/UserContext';


const ModificarPostForm = ({ imagen }) => {
    const onChange = useCallback(
        (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        },
        [formData]
    );

    const navigate = useNavigate();
    const { closePostM } = useContext(UserContext);
    const [formData, setFormData] = useState({
        descripcion: "",
    });
    const { descripcion } = formData;

    const onSubmit = useCallback(
        (event) => {
            event.preventDefault();

            navigate("/profile/mispublicaciones");
        },
        [navigate]
    );

    const [showConfirmPopup, setShowConfirmPopup] = useState(false);

    const toggleConfirmPopup = useCallback((event) => {
        event.preventDefault();
        console.log("we")
        setShowConfirmPopup((prevState) => !prevState);
    }, []);

    return (
        <>
            <div
                className="fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
                id="loginModal"
            >
                <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                    <h2 className="text-2xl font-semibold mb-4">Modificar Post</h2>
                    <form onSubmit={onSubmit}>
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
                                type="text"
                                placeholder="Descripcion"
                                name="descripcion"
                                value={descripcion}
                                onChange={onChange}
                                minLength="6"
                                required
                            />
                        </div>
                        <button
                            className="mb-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                            type="button"
                            onClick={toggleConfirmPopup}
                        >
                            Eliminar Post
                        </button>
                        {showConfirmPopup && (
                            <div className="fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
                                <div className="bg-white rounded-lg shadow-lg w-80 p-6">
                                    <h2 className="text-xl font-semibold mb-4">
                                        ¿Seguro que quieres eliminar la foto?
                                    </h2>
                                    <div className="flex justify-end">
                                        <button
                                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={toggleConfirmPopup}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={() => {
                                                // Aquí puedes agregar la función para eliminar la foto
                                                toggleConfirmPopup();
                                            }}
                                        >
                                            Aceptar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
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
};

export default ModificarPostForm