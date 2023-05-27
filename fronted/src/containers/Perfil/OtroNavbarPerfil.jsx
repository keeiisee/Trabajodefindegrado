import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { sendFriend } from '../../actions/auth';

export const OtroNavbarPerfil = () => {
    const userR = useSelector(state => state.auth.user);
    const [user, setUser] = useState("");
    const [profile, setProfile] = useState("");
    const routeParams = useParams()
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
                const responseProfile = await fetch(`http://localhost:8000/accounts/profile/${routeParams.id}/`, config);
                const dataProfile = await responseProfile.json();
                setProfile(dataProfile)
                const responseUser = await fetch(`http://localhost:8000/accounts/usuarios/${routeParams.id}/`, config);
                const dataUser = await responseUser.json()
                setUser(dataUser);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [routeParams.id]);
    const dispatch = useDispatch()
    function enviarAmistad(){
        dispatch(sendFriend(routeParams.id))
        window.location.reload();
    }
    function susPost() {
        navigate(`/suspublicaciones/${routeParams.id}`)
    }

    function infoPerfil() {
        navigate(`/perfil/${routeParams.id}`)
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
    }, [profile, user]);

    const url = useMemo(() => {
        if (profile) {
            return profile[0].imagen;
        }
        return '';
    }, [profile]);


    return (
        <>
            <aside id="default-sidebar" className="border-4 fixed top-55 left-8 z-40 w-64 h-50 col-md-2 " aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
                    <ul className="space-y-2 font-medium">
                        <div className="d-flex justify-content-center align-items-center flex-column my-3">
                            <img onClick={infoPerfil} className="w-50 h-50 rounded" src={url} alt="Foto de Perfil" width="150" />

                        </div>
                        <p className='d-flex justify-content-center align-items-center flex-column mt-4 mb-4'>{user.name}</p>

                        {/* <li>
                            <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Amigos</span>
                            </a>
                        </li> */}
                        <li>
                            <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                <span onClick={susPost} className="flex-1 ml-3 whitespace-nowrap">Publicaciones</span>
                            </a>
                        </li>

                        {esAmigo &&
                            <>
                                <li>
                                    <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 15c1.657 0 3-1.343 3-3V8a3 3 0 00-3-3H8a3 3 0 00-3 3v4c0 1.657 1.343 3 3 3h1m0 0l2 2m-2-2L9 15m7-6a4 4 0 11-8 0 4 4 0 018 0z"
                                            />
                                        </svg>
                                        <span onClick={susPost} className="flex-1 ml-3 whitespace-nowrap">Sois amigos</span>
                                    </a>
                                </li>
                            </>
                        }
                        {soliRec && 
                            <>
                                <li>
                                    <a className="flex items-center p-2 text-yellow-500 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 15c1.657 0 3-1.343 3-3V8a3 3 0 00-3-3H8a3 3 0 00-3 3v4c0 1.657 1.343 3 3 3h1m0 0l2 2m-2-2L9 15m7-6a4 4 0 11-8 0 4 4 0 018 0z"
                                            />
                                        </svg>
                                        <span  className="flex-1 ml-3 whitespace-nowrap">Solicitud Enviada</span>
                                    </a>
                                </li>
                            </>
                        }
                        {soliEnv && 
                            <>
                                <li>
                                    <a className="flex items-center p-2 text-yellow-500 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 15c1.657 0 3-1.343 3-3V8a3 3 0 00-3-3H8a3 3 0 00-3 3v4c0 1.657 1.343 3 3 3h1m0 0l2 2m-2-2L9 15m7-6a4 4 0 11-8 0 4 4 0 018 0z"
                                            />
                                        </svg>
                                        <span  className="flex-1 ml-3 whitespace-nowrap">Te ha enviado amistad</span>
                                    </a>
                                </li>
                            </>
                        }
                        {!soliEnv && !esAmigo && !soliRec ? (
                        <>
                            <li>
                                <a className="flex items-center p-2 text-green-500 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-green-500 transition duration-75 dark:text-white group-hover:text-green-900 dark:group-hover:text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                        />
                                    </svg>
                                    <span onClick={enviarAmistad} className="flex-1 ml-3 whitespace-nowrap">Enviar amistad</span>
                                </a>
                            </li>


                        </>) : null}
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default OtroNavbarPerfil
