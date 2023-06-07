import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MailIcon, PhoneIcon, CakeIcon } from '@heroicons/react/outline';
import { UserGroupIcon, NewspaperIcon, CogIcon, BellIcon } from '@heroicons/react/solid';
import styled from '@emotion/styled';
import TabSelector from './TabSelector';
import ListaAmigos from './ListaAmigos';
import axios from 'axios';
import { deleted_user, modificar_perfil } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TabSelectorNotis from '../Notificaciones/TabSelectorNotis';
import ToggleButton from './ToggleButton';
import TailwindSpinner from './TailwindSpinner';

const ProfileCard = styled.div`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  `;

function Profile1({ datas, onProfileUpdate }) {
    const [privateProfile, setPrivateProfile] = useState(datas.is_private);
    const [publicaciones, setPublicaciones] = useState(true)
    const [amigos, setAmigos] = useState(false)
    const [notificaciones, setNotificaciones] = useState(false)
    const [descripcionError, setDescripcionError] = useState("");
    const [telefonoError, setTelefonoError] = useState("");
    const [edadError, setEdadError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL;
    const [formData, setFormData] = useState({
        descripcion: '',
        imagen: null,
        edad: '',
        telefono: '',

    });
    const { descripcion, imagen, edad, telefono } = formData;
    const [editMode, setEditMode] = useState(false);

    const clickConfig = useCallback(() => {
        setEditMode(true);
    }, []);

    const cancelEdit = useCallback(() => {
        setFormData({
            ...formData,
            descripcion: datas.descripcion,
            imagen: null,
            edad: datas.edad,
            telefono: datas.telefono,
        });
        setEditMode(false);
        setPrivateProfile(datas.is_private);
    }, [datas, formData]);

    const handleToggle = useCallback((state) => {
        setPrivateProfile(state);
    }, []);

    // Efectos
    useEffect(() => {
        setFormData({
            ...formData,
            descripcion: datas.descripcion,
            imagen: null,
            edad: datas.edad,
            telefono: datas.telefono,
        });
    }, [datas]);

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
            };

            try {
                const amigosArray = datas.amigos;
                const amigosPromise = amigosArray.map(async (amigo) => {
                    try {
                        const response = await axios.get(`${apiUrl}/accounts/profile/${amigo}/`, config);
                        if (response.data) {
                            return response.data;
                        }
                    } catch (error) {
                        console.error(`Error fetching data for friend ${amigo}:`, error);
                    }
                });

                Promise.all(amigosPromise).then((fetchAmigos) => {
                    const validAmigos = fetchAmigos.filter((amigo) => amigo !== undefined);
                    setAmigosList(validAmigos);
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [onProfileUpdate]);

    const handleDeleteUser = (confirm) => {
        if (confirm) {
            dispatch(deleted_user())
            navigate('/'); // Llamamos la función eliminar si se confirma
        }
        setShowModal(false); // Cerramos el modal en ambos casos (confirmar o cancelar)
    };
    const inputFileRef = useRef(null);
    const user = useSelector(state => state.auth.user);
    const onChange = e => {
        if (e.target.type === 'file') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const saveChanges = useCallback(() => {
        let isValid = true;

        if (!descripcion) {
            setDescripcionError("El campo de biografia es obligatorio.");
            isValid = false;
        } else {
            setDescripcionError("");
        }

        if (!telefono) {
            setTelefonoError("El campo de teléfono es obligatorio.");
            isValid = false;
        } else {
            setTelefonoError("");
        }

        if (!edad) {
            setEdadError("El campo de edad es obligatorio.");
            isValid = false;
        } else {
            setEdadError("");
        }

        if (isValid) {
            setIsSaving(true);
            // Resto del código para enviar el formulario
            dispatch(modificar_perfil(imagen, descripcion, user, edad, telefono, privateProfile))
            // window.location.reload()
            setTimeout(() => {
                setIsSaving(false);
                // Llamar a onProfileUpdate para notificar que el perfil ha sido actualizado
                onProfileUpdate();
                setEditMode(false);
            }, 2000);

            // Actualizar los datos del usuario aquí

        }

    }, [dispatch, formData, privateProfile, datas.user, onProfileUpdate]);
    //

    function clickPubli() {
        setPublicaciones(true)
        setAmigos(false)
        setNotificaciones(false)
    }
    function clickAmi() {
        setAmigos(true)
    }
    function clickNoti() {
        setPublicaciones(false)
        setAmigos(false)
        setNotificaciones(true)
    }

    const [amigosList, setAmigosList] = useState([]);
    return (
        <>
            <ProfileCard className="mt-10 mx-10 rounded-lg shadow-md p-6">
                <div className="space-y-4">

                    {editMode ? (
                        <>
                            <input type="file" className="form-control hidden" ref={inputFileRef} onChange={(e) => onChange(e)} id="imagen" name="imagen" />
                            <img
                                src="https://logodix.com/logo/360469.png"
                                alt="cambiarImagen"
                                className="w-24 h-24 rounded-full object-cover cursor-pointer mt-0"
                                onClick={() => inputFileRef.current.click()}
                            />
                        </>
                    ) : (
                        <img
                            src={datas.imagen}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                    )}
                    <h1 className="text-2xl font-semibold">{datas.user_name}</h1>
                    {editMode ? (
                        <>
                            <h3 htmlFor="descripcion" className="form-label font-bold">Biografia:</h3>
                            <input
                                required
                                type="text"
                                className="form-control"
                                onChange={(e) => onChange(e)}
                                id="descripcion"
                                name="descripcion"
                                value={descripcion}
                                rows="3"
                            />
                        </>

                    ) : (
                        <>
                            <h3 htmlFor="descripcion" className="form-label font-bold">Biografia:</h3>
                            <h3 className="text-xl">{datas.descripcion}</h3>
                        </>

                    )}
                    {descripcionError && <p className='font-bold text-orange-500'>{descripcionError}</p>}
                </div>
                <ul className="text-sm space-y-2 mt-4">
                    <li className="flex items-center">
                        <UserGroupIcon className="h-5 w-5 mr-2" />
                        Logros: 0
                    </li>
                    <li className="flex items-center">
                        <PhoneIcon className="h-5 w-5 mr-2" />
                        Teléfono: {' '}
                        {editMode ? (
                            <input
                                required
                                name="telefono"
                                className="bg-white text-black focus:outline-none ml-2"
                                value={telefono}
                                onChange={(e) => onChange(e)}
                            />

                        ) : (
                            <p>{datas.telefono}</p>
                        )}
                        {telefonoError && <p className='ml-2 font-bold text-orange-500'>{telefonoError}</p>}
                    </li>
                    <li className="flex items-center">
                        <MailIcon className="h-5 w-5 mr-2" />
                        Correo electrónico: 17678239@gmail.com
                    </li>
                    <li className="flex items-center">
                        <CakeIcon className="h-5 w-5 mr-2" />
                        Edad:{' '}
                        {editMode ? (
                            <input
                                required
                                name="edad"
                                className="bg-white text-black focus:outline-none ml-2"
                                value={edad}
                                onChange={(e) => onChange(e)}
                            />
                        ) : (
                            <p>{datas.edad}</p>
                        )}
                        {edadError && <p className='ml-2 font-bold text-orange-500'>{edadError}</p>}
                    </li>
                    <li>
                        <label
                            className="flex items-center"
                            htmlFor="perfil"
                        >
                            Perfil Privado
                        </label>
                        <div className="mb-4">
                            {privateProfile &&
                                <ToggleButton
                                    initialState={privateProfile}
                                    onToggle={handleToggle}
                                    disabled={!editMode}
                                />
                            }
                            {!privateProfile &&
                                <ToggleButton
                                    initialState={privateProfile}
                                    onToggle={handleToggle}
                                    disabled={!editMode}
                                />
                            }


                        </div>
                    </li>

                </ul>
                <div className="flex flex-wrap justify-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                    <button onClick={clickAmi} className="bg-white text-purple-600 font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto">
                        <UserGroupIcon className="h-5 w-5 inline-block mr-2" />
                        Amigos {datas && datas.amigos.length}
                    </button>
                    <button onClick={clickPubli} className="bg-white text-purple-600 font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto">
                        <NewspaperIcon className="h-5 w-5 inline-block mr-2" />
                        Publicaciones
                    </button>
                    <button
                        onClick={clickNoti}
                        className="bg-white text-purple-600 font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto relative"
                    >
                        <BellIcon className="h-5 w-5 inline-block mr-2" />
                        Notificaciones
                        {datas.solicitudRecibida.length > 0 && (
                        <span
                          className="bg-green-500 w-4 h-4 rounded-full absolute top-0 right-0 border-2 border-white heartbeat"
                        ></span>
                      )}
                    </button>
                    {editMode ? (
                        <>
                            {
                                isSaving ? (
                                    <div className="flex justify-center items-center">
                                        <TailwindSpinner />
                                    </div>
                                ) : (
                                    <button
                                        onClick={saveChanges}
                                        className="bg-blue-500 text-white-600 font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto"
                                    >
                                        Guardar
                                    </button>
                                )

                            }

                            <button
                                onClick={cancelEdit}
                                className="bg-yellow-500 text-white-600 font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-red-500 text-white-600 font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto"
                            >
                                Eliminar usuario
                            </button>

                        </>
                    ) : (
                        <button
                            onClick={clickConfig}
                            className="bg-white text-purple-600 font-bold py-2 px-4 rounded focus:outline-none w-full sm:w-auto"
                        >
                            <CogIcon className="h-5 w-5 inline-block mr-2" />
                            Configuración
                        </button>
                    )}

                </div>
            </ProfileCard>
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
                                                ¿Estás seguro de que deseas eliminar este usuario? Todos los datos se perderán.
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
            {publicaciones && <TabSelector />}
            {notificaciones && <TabSelectorNotis onProfileUpdate={onProfileUpdate} />}
            {amigos && (
                <>
                    <ListaAmigos friends={amigosList} onClose={clickPubli} />
                </>
            )}
        </>
    );
}



export default Profile1