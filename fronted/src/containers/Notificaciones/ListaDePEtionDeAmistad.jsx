import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion';
import { addFriend, rejectFriend } from '../../actions/auth';
import { useDispatch } from 'react-redux';

const ListaDePEtionDeAmistad = ({ onProfileUpdate }) => {
    const dispatch = useDispatch();
    const [usuariosQueSolicitan, setUsuariosQueSolicitan] = useState({});
    const [profile, setProfile] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
            };

            try {
                const responseProfile = await fetch('http://localhost:8000/accounts/profile/', config);
                const dataProfile = await responseProfile.json();
                setProfile(dataProfile);

                const userIds = dataProfile[0].solicitudRecibida;
                const promises = userIds.map(async (userId) => {
                    const response = await fetch(`http://localhost:8000/accounts/usuarios/${userId}/`, config);
                    const userData = await response.json();

                    const responseProfileData = await fetch(`http://localhost:8000/accounts/profile/${userId}/`, config);
                    const profileData = await responseProfileData.json();

                    if (userData && profileData && profileData[0]) {
                        const datos = {
                            id: userData.id,
                            name: userData.name,
                            url: profileData[0].imagen,
                        };
                        setUsuariosQueSolicitan((prevUsuarios) => ({
                            ...prevUsuarios,
                            [userId]: datos,
                        }));
                    }
                });

                await Promise.all(promises);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [onProfileUpdate]);

    const solicitudRecibida = useMemo(() => {
        if (profile && profile.length > 0) {
            const userIds = profile[0].solicitudRecibida;
            const usuarios = userIds.map((userId) => usuariosQueSolicitan[userId]);
            return usuarios;
        }
        return [];
    }, [profile, usuariosQueSolicitan]);

    const updateSolicitudes = (id) => {
        setProfile((prevProfile) => {
            const updatedProfile = [...prevProfile];
            updatedProfile[0].solicitudRecibida = updatedProfile[0].solicitudRecibida.filter((userId) => userId !== id);
            return updatedProfile;
        });
    };

    const aceptarSolicitud = (id) => {
        setIsSaving(true);
        dispatch(addFriend(id));
        updateSolicitudes(id);
        setTimeout(() => {
            setIsSaving(false);
            // Llamar a onProfileUpdate para notificar que el perfil ha sido actualizado
            onProfileUpdate();
        }, 1000);
    };

    const denegarSolicitud = (id) => {
        dispatch(rejectFriend(id));
        updateSolicitudes(id);
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
    };

    return (
        <div className="container mx-auto">
            <motion.ul
                className="space-y-4"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                    exit: { opacity: 0 },
                }}
            >
                {solicitudRecibida.length <= 0 && (
                    <div className="mt-20 ml-20 mr-20 mb-20 text-center animate-bounce">
                        <h1 className="text-4xl font-bold text-gray-700 animate-pulse">No hay Notificaciones que ver</h1>
                        <p className="mt-4 text-gray-500">Lo sentimos, no hay contenido disponible en este momento.</p>
                    </div>
                )}
                {solicitudRecibida && solicitudRecibida.map((request, index) => (
                    <motion.li
                        key={index}
                        className="bg-white shadow-md rounded p-4 flex items-center justify-between space-x-4"
                        variants={itemVariants}
                    >

                        <div className="flex items-center space-x-4">
                            <img
                                src={request && request.url}
                                alt="Profile"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <a href={`/perfil/${request && request.id}`} className="text-xlfont-semibold">{request && request.name}</a>
                        </div>
                        <div className="flex space-x-2">
                            {
                                isSaving ? (
                                    <div className="flex justify-center items-center">
                                        <TailwindSpinner />
                                    </div>
                                ) : (
                                    <button
                                        className="bg-green-500 text-white font-bold py-1 px-3 rounded focus:outline-none"
                                        onClick={() => aceptarSolicitud(request && request.id)}

                                    >
                                        Aceptar
                                    </button>
                                )

                            }

                            <button
                                className="bg-red-500 text-white font-bold py-1 px-3 rounded focus:outline-none"
                                onClick={() => denegarSolicitud(request && request.id)}
                            >
                                Denegar
                            </button>
                        </div>
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
};

export default ListaDePEtionDeAmistad