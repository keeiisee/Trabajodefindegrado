import React, { useCallback, useEffect, useState } from 'react';
import { DateTimeForm } from './DateTimeForm';
import { Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { dislike_post, like_post } from '../actions/post';
//si
const ReservasList = React.memo(({ reserva, toggleMaterialVisibility, materialVisibility }) => (
    <ul className="list-disc ml-6">
        {reserva.map((res, index) => (
            <li key={index} className="hover:bg-blue-100 p-1 rounded">
                <span className="text-blue-800">{res.usuario_name} - {res.hora}</span>
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

export const PhotoModal = ({ actu, show, onClose, photoUrl, name, park, id, enBD, likes = [], disLikes = [] }) => {
    if (!show) return null;

    const imageUrl = photoUrl ? photoUrl : 'https://deportesurbanos.com/wp-content/uploads/2020/03/Instalacion-Parque-Calistenia-DUCNT-122.jpg'
    const user = useSelector(state => state.auth.user);
    const [materialVisibility, setMaterialVisibility] = useState([]);
    const [isLikeActive, setIsLikeActive] = useState(likes.includes(user.id));
    const [isDislikeActive, setIsDislikeActive] = useState(disLikes.includes(user.id));
    const dispatch = useDispatch()

    const [showDateTimeForm, setShowDateTimeForm] = useState(false);
    const [reserva, setReserva] = useState([])
    const handleOpenDateTimeForm = () => {
        setShowDateTimeForm(true);
    };
    const apiUrl = import.meta.env.VITE_API_URL;
    const handleCloseDateTimeForm = () => {
        setShowDateTimeForm(false);
    };

    useEffect(() => {
        if (enBD) {
            const fetchData = async () => {
                const config = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                    },
                    body: JSON.stringify({ place_id: id }) // Pasar el place_id en el cuerpo de la solicitud
                };
                try {
                    const reservas = await fetch(`${apiUrl}/accounts/reservas/parque/`, config);
                    const dataReserva = await reservas.json();
                    if (dataReserva) {
                        setReserva(dataReserva);
                    }


                } catch (error) {
                    console.log(error);
                }
            }
            fetchData();
        }
    }, [actu])

    //nuevo
    const handleLikeClick = (event) => {
        event.preventDefault();
        setIsLikeActive(true);
        setIsDislikeActive(false);
        dispatch(like_post(park, id, enBD))
        actu()
    };
    const toggleMaterialVisibility = useCallback((index) => {
        const newVisibility = [...materialVisibility];
        newVisibility[index] = !newVisibility[index];
        setMaterialVisibility(newVisibility);
    }, [materialVisibility]);

    const handleDislikeClick = async () => {
        setIsLikeActive(false);
        setIsDislikeActive(true);
        dispatch(dislike_post(park, id, enBD))
        actu()
    };
    return (
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
                            src={imageUrl}
                            alt={`${name} large`}
                            className="w-full h-48 sm:h-64 lg:h-96 object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/4 "></div>
                    </div>
                    <h2 className="mt-10 mx-3 text-xl sm:text-2xl font-bold mb-2 text-blue-700">
                        {name}
                    </h2>
                    <div className="p-4">
                        <div className="flex justify-between gap-x-4">
                            <Transition
                                show={true}
                                enter="transition ease-out duration-200"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <button
                                    className="mb-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    onClick={handleOpenDateTimeForm}
                                >
                                    Apuntarse
                                </button>
                            </Transition>
                        </div>

                        <DateTimeForm
                            show={showDateTimeForm}
                            actu={actu}
                            onClose={handleCloseDateTimeForm}
                            park={park}
                            enBD={enBD}
                        />
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
                            <button
                                className={`w-auto inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium ${isLikeActive
                                        ? "bg-green-600 text-white"
                                        : "bg-white text-green-600 border-green-600"
                                    } hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm`}
                                onClick={handleLikeClick}
                            >
                                <i className="fas fa-thumbs-up"></i>
                            </button>
                            <button
                                className={`w-auto inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium ${isDislikeActive
                                        ? "bg-red-600 text-white"
                                        : "bg-white text-red-600 border-red-600"
                                    } hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm`}
                                onClick={handleDislikeClick}
                            >
                                <i className="fas fa-thumbs-down"></i>
                            </button>
                        </div>
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onClose}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};