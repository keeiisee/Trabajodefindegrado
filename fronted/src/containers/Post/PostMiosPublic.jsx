import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { eliminar_post, modificar_post, post_like } from '../../actions/post';
import { CogIcon, HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import CircularProgress from "@material-ui/core/CircularProgress";
import { HeartIcon } from '@heroicons/react/outline';
import { load_Idprofile } from '../../actions/auth';
import { UserContext } from '../../provider/UserContext';

Modal.setAppElement('#root');
const PostMiosPublic = ({ imagen, profile, otro }) => {
    const { handleProfileUpdate, updateProfileKey } = useContext(UserContext);
    const [showImagePopup, setShowImagePopup] = useState(false);
    const [isOpenPM, setIsOpenPM] = useState(false)
    const user = useSelector(state => state.auth.user);
    if (user.name === imagen.autor_name) {
        otro = false
    }
    const dispatch = useDispatch();
    const [meGusta, setMeGusta] = useState(false);
    const [idProf, setIdProf] = useState(null);

    if (otro) {

        useEffect(() => {
            const fetchData = async () => {
                const datosProfile = await dispatch(load_Idprofile());
                setIdProf(datosProfile);
            };
            fetchData();
        }, []);
        useEffect(() => {
            if (idProf) {
                setMeGusta(imagen.like.includes(idProf[0].id));
            }
        }, [idProf, imagen.like, updateProfileKey]);

    }


    const [isLoading, setIsLoading] = useState(false);
    const showSpinner = (callback, time) => {
        setIsLoading(true);

        setTimeout(() => {
            callback();
            setIsLoading(false);
        }, time);
    };


    function openPostM() {
        setIsOpenPM(true)
    }
    function cancelar() {
        setIsOpenPM(false)
        setFormData({ ...formData, ["descripcion"]: imagen.descripcion })
    }
    function eliminarPost() {
        showSpinner(() => {
            dispatch(eliminar_post(imagen.id))
                .then(() => {
                    handleProfileUpdate();
                })

            setIsOpenPM(false)
        }, 2000);
    }

    function modificarPu() {
        showSpinner(() => {
            dispatch(modificar_post(imagen.id, descripcion))
                .then(() => {
                    handleProfileUpdate();
                })
            setIsOpenPM(false)
        }, 3000);
    }


    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const [formData, setFormData] = useState({
        descripcion: null
    });
    const { descripcion } = formData;
    useEffect(() => {
        const fechData = async () => {
            setFormData({ ...formData, ["descripcion"]: imagen.descripcion })
        }
        fechData()
    }, [])

    const [showConfirmPopup, setShowConfirmPopup] = useState(false);

    const toggleConfirmPopup = useCallback(() => {
        setShowConfirmPopup((prevState) => !prevState);
    }, []);

    function like() {
        dispatch(post_like(imagen.id, !meGusta))
        setMeGusta(!meGusta)
    }
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0', // Remueve el padding del modal
        },
    };
    return (
        <>
            {isLoading && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <CircularProgress />
                </div>
            )}
            <motion.div

                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col"
                whileHover={{ scale: 1.00 }}
                transition={{ duration: 0.3 }}
            >
                <div onClick={() => setShowImagePopup(true)} className="relative h-64 w-full mb-4">
                    <img
                        src={imagen.imagen}
                        alt={imagen.descripcion}
                        className="w-full h-full max-w-full max-h-full object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                </div>
                <div className="flex-1 flex flex-col">
                    <h2 className="text-xl font-semibold mb-2">
                        Por {imagen.autor_name}, el dia: {imagen.fecha_publicacion.substring(0, 10)}
                    </h2>
                    {!isOpenPM && <p className="mb-2 break-words whitespace-normal">{imagen.descripcion}</p>}
                    {isOpenPM && (
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring focus:border-blue-300 flex-grow"
                            id="descripcion"
                            type="text"
                            placeholder="Descripcion"
                            name="descripcion"
                            value={descripcion}
                            onChange={(e) => onChange(e)}
                            minLength="6"
                            required
                        />
                    )}
                    <div className="flex items-center justify-between">
                        {!isOpenPM && otro ? (
                            <button onClick={like} className="focus:outline-none">
                                {meGusta ? (
                                    <HeartIconSolid className="w-6 h-6 text-red-500 transition-colors duration-300 ease-in-out animate-like" />
                                ) : (
                                    <HeartIcon className="w-6 h-6 text-gray-500 transition-colors duration-300 ease-in-out hover:text-red-500" />
                                )}
                            </button>
                        ) : !otro && !isOpenPM ? (
                            <button onClick={openPostM} className="text-gray-500 flex items-center space-x-2 focus:outline-none">
                                <CogIcon className="h-6 w-6" />
                                <span>Configurar Imagen</span>
                            </button>
                        ) : null}

                        {isOpenPM && (
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full">
                                <button
                                    className="text-sm sm:text-base bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto mb-2 sm:mb-0 flex-grow sm:flex-basis-1/3"
                                    type="button"
                                    onClick={toggleConfirmPopup}
                                >
                                    Eliminar Post
                                </button>
                                <button
                                    className="text-sm sm:text-base bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto mb-2 sm:mb-0 flex-grow sm:flex-basis-1/3"
                                    type="button"
                                    onClick={cancelar}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="text-sm sm:text-base bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto mb-2 sm:mb-0 flex-grow sm:flex-basis-1/3"
                                    type="button"
                                    onClick={modificarPu}
                                >
                                    Modificar Post
                                </button>
                            </div>
                        )}
                        {showConfirmPopup && (
                            <div className="fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
                                <div className="bg-white rounded-lg shadow-lg w-80 p-6">
                                    <h2 className="text-xl font-semibold mb-4">
                                        ¿Seguro que quieres eliminar la foto?
                                    </h2>
                                    <div className="flex justify-end">
                                        <button
                                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={toggleConfirmPopup}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={() => {
                                                eliminarPost()

                                                // Aquí puedes agregar la función para eliminar la foto
                                                toggleConfirmPopup();
                                            }}
                                        >
                                            Aceptar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <Modal
                    isOpen={showImagePopup}
                    style={customStyles}
                    contentLabel="Imagen ampliada"
                >
                    <div className="flex flex-col items-center justify-center p-4 overflow-auto">
                        {/* Nuevo div para envolver el contenido y el botón de cierre */}
                        <div className="relative max-w-[290px]">
                            {/* Botón para cerrar el modal */}
                            <button
                                onClick={() => setShowImagePopup(false)}
                                className="absolute top-2 right-2 bg-white text-gray-800 rounded-full p-1 hover:bg-gray-100 focus:outline-none"
                            >
                                <MdClose size={24} />
                            </button>
                            <img src={imagen.imagen} alt={imagen.descripcion} className="object-contain max-w-full max-h-[290px] mb-2" />
                            {/* Nuevo div para el párrafo "Descripción" */}
                            {otro &&
                                <div className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold py-1 px-4 mb-2 rounded shadow-md">
                                    <a href={`/#/perfil/${imagen.autor_id}`}>Ver Perfil</a>

                                </div>
                            }
                            {!otro &&
                                <div className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold py-1 px-4 mb-2 rounded shadow-md">
                                    Descripción
                                </div>
                            }

                            <p className="break-all whitespace-normal">{imagen.descripcion}</p>
                        </div>
                    </div>
                </Modal>
            </motion.div>
        </>

    );
}


export default PostMiosPublic