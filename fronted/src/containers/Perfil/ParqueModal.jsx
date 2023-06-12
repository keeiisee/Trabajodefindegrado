import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Transition } from '@headlessui/react';
import { deleted_reserva } from '../../actions/reserva';
import { UserContext } from '../../provider/UserContext';
const ReservasList = React.memo(({ reserva, toggleMaterialVisibility, materialVisibility }) => (
    <ul className="list-disc ml-6">
        {reserva.map((res, index) => (
            <li key={index} className="hover:bg-blue-100 p-1 rounded">
                <span className="text-blue-800">{res.usuario_name} - {res.fecha}</span>
                {res.materiales.length > 0 &&
                    <button
                        onClick={() => toggleMaterialVisibility(index)}
                        className="text-blue-600 underline ml-2"
                    >
                        {materialVisibility[index] ? 'Ocultar materiales' : 'Ver materiales'}
                    </button>
                }

                {materialVisibility[index] && res.materiales && res.materiales.length > 0 && (
                    <Transition
                        show={materialVisibility[index]}
                        enter="transition-opacity duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <ul className="list-disc ml-6">
                            {res.materiales.map((material, materialIndex) => (
                                <li key={materialIndex} className="text-blue-900">{material.nombre}</li>
                            ))}
                        </ul>
                    </Transition>
                )}
            </li>
        ))}
    </ul>
));
const ParqueModal = ({ likes, disLikes, show, onClose, photoUrl, name, id, fecha, idReserva }) => {
    if (!show) return null;
    const { handleProfileUpdate } = useContext(UserContext);
    const user = useSelector(state => state.auth.user);
    const [materialVisibility, setMaterialVisibility] = useState([]);
    const isLikeActive = likes.includes(user.id);
    const isDislikeActive = disLikes.includes(user.id);
    const [reserva, setReserva] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL;
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const dispatch = useDispatch()
    const [isSaving, setIsSaving] = useState(false);
    const handleDeleteButtonClick = () => {
        setShowDeleteModal(true);
    };
    const handleDeleteUser = (confirmed) => {
        if (confirmed) {
            setIsSaving(true);
            dispatch(deleted_reserva(idReserva))
                .then(() => {
                    handleProfileUpdate()
                    onClose()
                    setIsSaving(false);
                    setShowDeleteModal(false);
                })
        }
        setShowDeleteModal(false);
    };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                body: JSON.stringify({ place_id: id, fecha: fecha })
                // Pasar el place_id en el cuerpo de la solicitud
            };

            try {
                const reservas = await fetch(`${apiUrl}/accounts/reservasPorfecha/`, config);
                const dataReserva = await reservas.json();
                if (dataReserva) {
                    setReserva(dataReserva);
                }
                setIsLoading(false);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();

    }, [])

    //nuevo
    const toggleMaterialVisibility = useCallback((index) => {
        const newVisibility = [...materialVisibility];
        newVisibility[index] = !newVisibility[index];
        setMaterialVisibility(newVisibility);
    }, [materialVisibility]);

    return (
        <>
            {isLoading &&
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="spinner"></div>
                </div>

            }
            {!isLoading &&
                <div className="fixed z-10 inset-0 overflow-y-auto">

                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle" aria-hidden="true">
                            &#8203;
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="relative">
                                <img
                                    src={photoUrl}
                                    alt={`${name} large`}
                                    className="w-full h-48 sm:h-64 lg:h-96 object-cover"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1/4 "></div>
                            </div>
                            <h2 className="mt-10 mx-3 text-xl sm:text-2xl font-bold mb-2 text-blue-700">
                                {name}
                            </h2>
                            <div className="p-4">
                                {reserva.length > 0 && (
                                    <>
                                        <h3 className="text-xl font-semibold text-blue-600">
                                            Personas apuntadas:
                                        </h3>
                                    </>
                                )}
                                <ReservasList
                                    reserva={reserva}
                                    toggleMaterialVisibility={toggleMaterialVisibility}
                                    materialVisibility={materialVisibility}
                                />
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:items-center sm:justify-between">
                                <div className="mb-2 sm:mb-0 sm:flex sm:space-x-2">
                                    {isLikeActive &&
                                        <button
                                            className={`w-auto inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium ${isLikeActive
                                                ? "bg-green-600 text-white"
                                                : "bg-white text-green-600 border-green-600"
                                                } hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm`}
                                        >
                                            <i className="fas fa-thumbs-up"></i>
                                        </button>
                                    }
                                    {isDislikeActive &&
                                        <button
                                            className={`w-auto inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium ${isDislikeActive
                                                ? "bg-red-600 text-white"
                                                : "bg-white text-red-600 border-red-600"
                                                } hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm`}
                                        >
                                            <i className="fas fa-thumbs-down"></i>
                                        </button>
                                    }

                                </div>
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={onClose}
                                >
                                    Cerrar
                                </button>
                                <button
                                    disabled={isSaving}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleDeleteButtonClick}
                                >
                                    {isSaving ? 'Eliminando...' : 'Eliminar Registro'}
                                </button>

                                {/* Código existente */}
                                {showDeleteModal && (
                                    <div
                                        className="fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
                                        id="loginModal"
                                    >
                                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                            <div
                                                className="fixed inset-0 transition-opacity"
                                                aria-hidden="true"
                                                onClick={() => handleDeleteUser(false)}
                                            >
                                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                            </div>
                                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                                &#8203;
                                            </span>
                                            <div
                                                className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full"
                                                role="dialog"
                                                aria-modal="true"
                                                aria-labelledby="modal-headline"
                                            >
                                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                    <div className="sm:flex sm:items-start">
                                                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                                                Confirmar eliminación
                                                            </h3>
                                                            <div className="mt-2">
                                                                <p className="text-sm text-gray-500">
                                                                    ¿Estás seguro de que deseas eliminar este registro? Todos los datos se borrarán.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-between">
                                                    <button
                                                        type="button"
                                                        className="bg-red-600 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none w-full sm:w-auto sm:ml-2"
                                                        onClick={() => handleDeleteUser(true)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto sm:mr-2"
                                                        onClick={() => handleDeleteUser(false)}
                                                    >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>

    );
};
export default ParqueModal