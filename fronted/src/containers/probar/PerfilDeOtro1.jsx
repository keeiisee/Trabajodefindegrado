import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { MailIcon, PhoneIcon, CakeIcon } from '@heroicons/react/outline';
import { UserGroupIcon, NewspaperIcon, CogIcon, BellIcon } from '@heroicons/react/solid';
import TabSelector from './TabSelector';
import { removeFriend, sendFriend } from '../../actions/auth';
import TabSelectorOtro from './TabSelectorOtro';

const ProfileCard = styled.div`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  `;
const PerfilDeOtro1 = () => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()

    const [publicaciones, setPublicaciones] = useState(true)
    const userR = useSelector(state => state.auth.user);
    const [profile, setProfile] = useState("");
    const routeParams = useParams()
    const navigate = useNavigate()
    const miProfile = useSelector(state => state.auth.profile);
    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            };
            try {
                const responseProfile = await fetch(`http://localhost:8000/accounts/profile/${routeParams.id}/`, config);
                const dataProfile = await responseProfile.json();
                setProfile(dataProfile)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [routeParams.id]);

    const handleDeleteUser = (confirm) => {
        if (confirm) {
            dispatch(removeFriend(profile[0].user_id))
            window.location.reload() // Llamamos la función eliminar si se confirma
        }
        setShowModal(false); // Cerramos el modal en ambos casos (confirmar o cancelar)
    };
    function enviarAmistad() {
        dispatch(sendFriend(routeParams.id))
        window.location.reload();
    }
    function susPost() {
        navigate(`/suspublicaciones/${routeParams.id}`)
    }

    function infoPerfil() {
        navigate(`/perfil/${routeParams.id}`)
    }
    function enviarAmistad(){
        dispatch(sendFriend(routeParams.id))
        window.location.reload();
    }
    const [esAmigo, setEsAmigo] = useState(false)
    const [soliRec, setSoliRec] = useState(false)
    const [soliEnv, setSoliEnv] = useState(false)
    useEffect(() => {
        // Verifica si profile tiene datos y si tiene al menos un amigo
        if (profile && profile.length > 0 && profile[0].amigos) {
            // Guarda los amigos en un nuevo array
            const amigosArray = profile[0].amigos;
            const recibidosArray = profile[0].solicitudRecibida
            const enviadosArray = profile[0].solicitudEnviada

            if (enviadosArray.includes(userR.id)) {
                setSoliEnv(true)
            } else {
                setSoliEnv(false)
            }
            if (recibidosArray.includes(userR.id)) {
                setSoliRec(true)
            } else {
                setSoliRec(false)
            }
            // Comprueba si user.id está presente en amigosArray
            if (amigosArray.includes(userR.id)) {
                setEsAmigo(true)
            } else {
                setEsAmigo(false)
            }
        }
    }, [profile]);

    const url = useMemo(() => {
        if (profile) {
            return profile[0].imagen;
        }
        return '';
    }, [profile]);
    return (
        <>
            <ProfileCard className="mt-10 mx-10 rounded-lg shadow-md p-6">
                <div className="space-y-4">
                    <img
                        onClick={infoPerfil}
                        src={url}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                    />

                    <h1 className="text-2xl font-semibold">{profile && profile[0].user_name}</h1>
                    <h3 htmlFor="descripcion" className="form-label font-bold">Biografia:</h3>
                    <h3 className="text-xl">{profile && profile[0].descripcion}</h3>
                </div>
                <ul className="text-sm space-y-2 mt-4">
                    
                    <li className="flex items-center">
                        <PhoneIcon className="h-5 w-5 mr-2" />
                        Teléfono: {' '}

                        654345417

                    </li>
                    <li className="flex items-center">
                        <UserGroupIcon className="h-5 w-5 mr-2" />
                        Logros: 0
                    </li>
                    <li className="flex items-center">
                        <MailIcon className="h-5 w-5 mr-2" />
                        Correo electrónico: 17678239@gmail.com
                    </li>
                    <li className="flex items-center">
                        <CakeIcon className="h-5 w-5 mr-2" />
                        Edad:{' '}

                        24

                    </li>
                </ul>
                <div className="flex flex-wrap justify-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                    {esAmigo &&
                        <>
                            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto">
                                <UserGroupIcon className="h-5 w-5 inline-block mr-2" />
                                Amigos
                            </button>
                            <button onClick={() => setShowModal(true)} className="bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto">
                                <UserGroupIcon className="h-5 w-5 inline-block mr-2" />
                                Eliminar Amistad
                            </button>
                        </>


                    }
                    {
                        soliRec &&
                        <button className="bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto">
                            <UserGroupIcon className="h-5 w-5 inline-block mr-2" />
                            Solicitud Enviada
                        </button>
                    }
                    {
                        soliEnv &&
                        <button className="bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto">
                            <UserGroupIcon className="h-5 w-5 inline-block mr-2" />
                            Te ha enviado solicitud
                        </button>
                    }
                    {!soliEnv && !esAmigo && !soliRec ? (
                        <>
                            <button onClick={enviarAmistad} className="bg-white text-purple-600 font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto">
                                <NewspaperIcon className="h-5 w-5 inline-block mr-2" />
                                Enviar Amistad
                            </button>
                        </>) : null}
                    <button className="bg-white text-purple-600 font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto">
                        <NewspaperIcon className="h-5 w-5 inline-block mr-2" />
                        Publicaciones
                    </button>
                    {/* // <button

                    //     className="bg-white text-purple-600 font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto"
                    // >
                    //     <BellIcon className="h-5 w-5 inline-block mr-2" />
                    //     Notificaciones
                    // </button> */}
                </div>
            </ProfileCard >
            {showModal && (
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
                                                ¿Estás seguro de que quieres dejar de ser su amigo?.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse ">
                                <button
                                    type="button"
                                    className="bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto sm:ml-2"
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
            {publicaciones && <TabSelectorOtro />
            }
        </>
    );
}

export default PerfilDeOtro1