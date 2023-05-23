import React, { useEffect, useMemo, useState } from 'react'
import Navbarperfil from '../Perfil/Navbarperfil'
import { añadir_amigos, añadir_amigos_enviados } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
                            profileId: profileData[0].id,
                            notiEnviada: profileData[0].solicitudEnviada,
                            amigos: profileData[0].amigos
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

    const solicitudRecibida1 = useMemo(() => {
        if (profile && profile.length > 0) {
            const userIds = profile[0].solicitudRecibida;
            const usuarios = userIds.map((userId) => usuariosQueSolicitan[userId]);
            return usuarios;
        }
        return [];
    }, [profile, usuariosQueSolicitan]);


    const aceptarSolicitud = (id, solicitudEnviada = [], profileId, amigos = []) => {
        const soliRe = profile[0].solicitudRecibida.filter((numero) => numero !== id);
        // Lógica para aceptar la solicitud de amistad

        const arrayIdR = profile[0].amigos
        arrayIdR.push(id)
        dispatch(añadir_amigos(profile[0].id, profile[0].user, arrayIdR, soliRe))

        const soliEn = solicitudEnviada.filter((numero) => numero !== profile[0].user);
        const arrayIdE = amigos
        arrayIdE.push(profile[0].user)
        dispatch(añadir_amigos_enviados(profileId, id, arrayIdE, solicitudEnviada, soliEn))
        window.location.reload();
    };

    const denegarSolicitud = (id) => {
        // Lógica para denegar la solicitud de amistad
        console.log(`Solicitud denegada para el amigo con ID ${id}`);
    };
    return (
        <>
            <Navbarperfil></Navbarperfil>
            <div className="sm:ml-64 mr-6">
                <div className="p-4 ml-6 sm:ml-14 border-4 nav-border bg-marron rounded-lg dark:border-gray-700">

                    <div className="flex flex-wrap justify-center">
                        {solicitudRecibida1 && solicitudRecibida1.map((tarjeta, index) => (

                            <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-4">

                                <img src={tarjeta && tarjeta.url} alt="{tarjeta.user}" className="w-full" />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">{tarjeta && tarjeta.name}</div>
                                    <p>Ha solicitado ser tu amigo</p>
                                    <br />
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => aceptarSolicitud(tarjeta.id, tarjeta.solicitudEnviada, tarjeta.profileId, tarjeta.amigos)}
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
