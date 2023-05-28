import React, { useEffect, useState } from 'react';
import { DateTimeForm } from './DateTimeForm';
import { AchievementForm } from './AchievementForm';
//si
export const PhotoModal = ({ show, onClose, photoUrl, name , park, id}) => {
    if (!show) return null;
    const achievements = ["perimer logro", "segun", "tercer"]
    const attendees = ["perimer logro", "segun", "tercer"]
    const [showDateTimeForm, setShowDateTimeForm] = useState(false);
    const [showAchievementForm, setShowAchievementForm] = useState(false);
    const [reserva, setReserva] = useState([])
    const handleOpenDateTimeForm = () => {
        setShowDateTimeForm(true);
    };

    const handleCloseDateTimeForm = () => {
        setShowDateTimeForm(false);
    };

    const handleOpenAchievementForm = () => {
        setShowAchievementForm(true);
    };

    const handleCloseAchievementForm = () => {
        setShowAchievementForm(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            };
            
            try {
                const reservas = await fetch(`http://localhost:8000/accounts/reservas/parque/${id}/`, config);
                const dataReserva= await reservas.json();
                setReserva(dataReserva);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [])

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white">
                        <img src={photoUrl} alt={`${name} large`} className="w-full h-96 object-cover" />
                    </div>
                    <div className="p-4">
                        <div className="mt-4 flex justify-between gap-x-4">
                            <button
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={handleOpenDateTimeForm}
                            >
                                Apuntarse
                            </button>
                            <button
                                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                onClick={handleOpenAchievementForm}
                            >
                                Añadir material
                            </button>
                        </div>

                        <DateTimeForm show={showDateTimeForm} onClose={handleCloseDateTimeForm} place_id={park.place_id}/>
                        <AchievementForm show={showAchievementForm} onClose={handleCloseAchievementForm} />
                        <h2 className="text-2xl font-bold mb-2">{name}</h2>
                        <h3 className="text-xl font-semibold">Logros:</h3>
                        <ul className="list-disc ml-6 mb-4">
                            {achievements.map((achievement, index) => (
                                <li key={index}>{achievement}</li>
                            ))}
                        </ul>
                        <h3 className="text-xl font-semibold">Personas apuntadas:</h3>
                        <ul className="list-disc ml-6">
                            
                            {reserva.length > 0 && reserva.map((res, index) => (
                                <>
                                 <li key={index}>{res.usuario_name} - {res.fecha}</li>
                                 
                                </>
                               
                            ))}
                        </ul>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

