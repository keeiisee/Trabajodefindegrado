import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { MailIcon, PhoneIcon, CakeIcon } from '@heroicons/react/outline';
import { UserGroupIcon, NewspaperIcon, CogIcon, BellIcon } from '@heroicons/react/solid';
import TabSelector from './TabSelector';
import { removeFriend, sendFriend } from '../../actions/auth';
import TabSelectorOtro from './TabSelectorOtro';
import { UserContext } from '../../provider/UserContext';

const ProfileCard = styled.div`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  `;
const PerfilDeOtro1 = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [publicaciones, setPublicaciones] = useState(true)
    const apiUrl = import.meta.env.VITE_API_URL;
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const userR = useSelector(state => state.auth.user);
    const [profile, setProfile] = useState("");
    const routeParams = useParams();
    const navigate = useNavigate();
    const { handleProfileUpdate, updateProfileKey } = useContext(UserContext);
    const [relationshipStatus, setRelationshipStatus] = useState({
        esAmigo: false,
        soliRec: false,
        soliEnv: false,
    });

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${localStorage.getItem("access")}`,
            },
        };
        try {
            const responseProfile = await fetch(`${apiUrl}/accounts/profile/${routeParams.id}/`, config);
            const dataProfile = await responseProfile.json();
            setProfile(dataProfile);

            const { amigos, solicitudRecibida, solicitudEnviada } = dataProfile[0];

            setRelationshipStatus({
                esAmigo: amigos.includes(userR && userR.id),
                soliRec: solicitudRecibida.includes(userR && userR.id),
                soliEnv: solicitudEnviada.includes(userR && userR.id),
            });
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, [routeParams.id, updateProfileKey]);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDeleteUser = (confirm) => {
        if (confirm) {
            dispatch(removeFriend(profile[0].user_id)).then(() => fetchData());
        }
        setShowModal(false);
    };

    const enviarAmistad = () => {
        dispatch(sendFriend(routeParams.id)).then(() => fetchData());
    };

    const infoPerfil = () => {
        navigate(`/perfil/${routeParams.id}`);
    };

    const url = useMemo(() => {
        if (profile) {
            return profile[0].imagen;
        }
        return "";
    }, [profile]);

    const privacidad = useMemo(() => {
        if (profile) {
            return profile[0].is_private;
        }
        return "";
    }, [profile]);


    return (

        <>
            {isLoading &&
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="spinner"></div>
                </div>
            }
            {!isLoading && privacidad && !relationshipStatus.esAmigo ? (
                <>
                    <ProfileCard className="mt-10 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 rounded-lg shadow-md p-6">
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

                                {profile && profile[0].telefono}

                            </li>
                            <li className="flex items-center">
                                <UserGroupIcon className="h-5 w-5 mr-2" />
                                Logros: 0
                            </li>
                            <li className="flex items-center">
                                <MailIcon className="h-5 w-5 mr-2" />

                                Correo electrónico: {profile && profile[0].email}
                            </li>
                            <li className="flex items-center">
                                <CakeIcon className="h-5 w-5 mr-2" />
                                Edad:{' '}

                                {profile && profile[0].edad}

                            </li>
                        </ul>
                        <div className="flex flex-wrap justify-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                            {
                                relationshipStatus.soliRec &&
                                <button className="bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto">
                                    <UserGroupIcon className="h-5 w-5 inline-block mr-2" />
                                    Solicitud Enviada
                                </button>
                            }
                            {
                                relationshipStatus.soliEnv &&
                                <button className="bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto">
                                    <UserGroupIcon className="h-5 w-5 inline-block mr-2" />
                                    Te ha enviado solicitud
                                </button>
                            }
                            {!relationshipStatus.soliEnv && !relationshipStatus.esAmigo && !relationshipStatus.soliRec ? (
                                <>
                                    <button onClick={enviarAmistad} className="bg-white text-purple-600 font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto">
                                        <NewspaperIcon className="h-5 w-5 inline-block mr-2" />
                                        Enviar Amistad
                                    </button>
                                </>) : null}
                        </div>
                    </ProfileCard >
                    <div className="mt-20 ml-20 mr-20 mb-20 text-center animate-bounce">
                        <h1 className="text-4xl font-bold text-gray-700 animate-pulse">Este perfil es privado</h1>
                        <p className="mt-4 text-gray-500">Para poder ver sus publicaciones y me gusta, enviale amistad</p>
                    </div>
                </>

            ) : null}
            {privacidad && relationshipStatus.esAmigo || !privacidad ? (
                <>
                    <ProfileCard className="mt-10 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 rounded-lg shadow-md p-6">
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
                                Teléfono: {profile && profile[0].telefono}

                            </li>
                            <li className="flex items-center">
                                <UserGroupIcon className="h-5 w-5 mr-2" />
                                Nivel: {profile && profile[0].nivel}
                            </li>
                            <li className="flex items-center">
                                <MailIcon className="h-5 w-5 mr-2" />
                                Correo electrónico: {profile && profile[0].user_email}
                            </li>
                            <li className="flex items-center">
                                <CakeIcon className="h-5 w-5 mr-2" />
                                Edad: {profile && profile[0].edad}

                            </li>
                        </ul>
                        <div className="flex flex-wrap justify-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                            {relationshipStatus.esAmigo &&
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
                                relationshipStatus.soliRec &&
                                <button className="bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto">
                                    <UserGroupIcon className="h-5 w-5 inline-block mr-2" />
                                    Solicitud Enviada
                                </button>
                            }
                            {
                                relationshipStatus.soliEnv &&
                                <button className="bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto">
                                    <UserGroupIcon className="h-5 w-5 inline-block mr-2" />
                                    Te ha enviado solicitud
                                </button>
                            }
                            {!relationshipStatus.soliEnv && !relationshipStatus.esAmigo && !relationshipStatus.soliRec ? (
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
                    {publicaciones && profile ? <TabSelectorOtro mislikes={profile[0].publicaciones_con_mis_likes} imga={profile[0].user_publicaciones} profile={profile[0]} />
                        : null}
                </>
            ) : null}


        </>
    );
}

export default PerfilDeOtro1