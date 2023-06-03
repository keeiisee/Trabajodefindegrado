import React, { useEffect, useMemo, useState } from 'react'
import Navbarperfil from '../Perfil/Navbarperfil'
import { addFriend, rejectFriend } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavbarSuperPerfil } from '../../components/NavbarSuperPerfil';

export const NotiRecibidas = () => {
    const dispatch = useDispatch()
    const [usuariosQueSolicitan, setUsuariosQueSolicitan] = useState([]);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
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
    }, []);

    const solicitudRecibida = useMemo(() => {
        if (profile && profile.length > 0) {
            const userIds = profile[0].solicitudRecibida;
            const usuarios = userIds.map((userId) => usuariosQueSolicitan[userId]);
            return usuarios;
        }
        return [];
    }, [profile, usuariosQueSolicitan]);


    const aceptarSolicitud = (id) => {
        dispatch(addFriend(id))
        window.location.reload();
    };

    const denegarSolicitud = (id) => {
        dispatch(rejectFriend(id))
        window.location.reload();
    };
    
    return (
        <>
        <NavbarSuperPerfil/>
            <Navbarperfil />
            <div className="sm:ml-64 mr-6">
                <div className="p-4 ml-6 sm:ml-14 border-4 nav-border bg-marron rounded-lg dark:border-gray-700">

                    <div className="flex flex-wrap justify-center">
                        {solicitudRecibida && solicitudRecibida.map((tarjeta, index) => (

                            <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-4">

                                <img src={tarjeta && tarjeta.url} alt="{tarjeta.user}" className="w-full" />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">{tarjeta && tarjeta.name}</div>
                                    <p>Ha solicitado ser tu amigo</p>
                                    <br />
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => aceptarSolicitud(tarjeta.id)}
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Aceptar
                                        </button>
                                        <button
                                            onClick={() => denegarSolicitud(tarjeta.id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Denegar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </>
    )
}
