import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { eliminar_post, modificar_post, post_like } from '../actions/post';
import { HeartIcon } from '@heroicons/react/outline';
import { CogIcon, HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import ModificarPostForm from '../containers/Post/ModificarPostForm';
import { UserContext } from '../provider/UserContext';

const ImagenInicio = ({ imagen }) => {
    const [isOpenPM, setIsOpenPM] = useState(false)
    const dispatch = useDispatch()
    const [profile, setProfile] = useState(null)
    const [mismoUser, setMismoUser] = useState(false)
    const [meGusta, setMeGusta] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            };
            try {
                const responseProfile = await fetch(`http://localhost:8000/accounts/profiles/profiles/${imagen.autor}/`, config);
                const dataProfile = await responseProfile.json();
                setProfile(dataProfile);
                const responseUser = await fetch(`http://localhost:8000/accounts/profile/`, config);
                const dataUser = await responseUser.json()

                if (dataUser[0].user_id === dataProfile.user_id) {
                    setMismoUser(true)
                } else if (imagen.like.includes(dataUser[0].id)) {
                    setMeGusta(true)
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [imagen.autor]);

    function like() {
        dispatch(post_like(imagen.id, !meGusta))
        setMeGusta(!meGusta)
    }
    function openPostM() {
        setIsOpenPM(true)
    }
    function cancelar() {
        setIsOpenPM(false)
        setFormData({ ...formData, ["descripcion"]: imagen.descripcion })
    }
    function eliminarPost() {
        dispatch(eliminar_post(imagen.id))
        window.location.reload()
    }

    function modificarPu() {
        dispatch(modificar_post(imagen.id, descripcion))
        window.location.reload()
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

    return (
        <>
            <div className="relative">
            </div>
            <div className="p-4 md:w-1/2 shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out ">
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={imagen.imagen} alt={imagen.descripcion} />
                    <div className="p-6">

                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{profile && profile.user_name} - {imagen.fecha_publicacion.substr(0, 10)}</h1>
                        {
                            !isOpenPM &&
                            <p className="leading-relaxed mb-3">{imagen.descripcion}</p>
                        }
                        
                        {
                            isOpenPM &&
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="descripcion"
                                type='text'
                                placeholder='Descripcion'
                                name='descripcion'
                                value={descripcion}
                                onChange={e => onChange(e)}
                                minLength='6'
                                required
                            />

                        }

                        <div className="flex items-center flex-wrap ">
                            {/* {
                            isOpenPM &&
                        } */}
                            {!isOpenPM && !mismoUser ? (
                                <button onClick={like} className="focus:outline-none">
                                    {meGusta ? (
                                        <HeartIconSolid className="w-6 h-6 text-red-500 transition-colors duration-300 ease-in-out animate-like" />
                                    ) : (
                                        <HeartIcon className="w-6 h-6 text-gray-500 transition-colors duration-300 ease-in-out hover:text-red-500" />
                                    )}
                                </button>
                            ) : mismoUser && !isOpenPM ? (
                                <a className="text-gray-400 inline-flex items-center leading-none text-sm ">
                                    <CogIcon className="h-5 w-5" />
                                    <span onClick={openPostM} className="ml-3">Configurar Imagen</span>
                                </a>
                            ) : null}
                            {
                                isOpenPM &&
                                <>

                                    <div className="flex items-center justify-between">
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2 rounded focus:outline-none transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                                            type="button"
                                            onClick={eliminarPost}
                                        >Eliminar Post</button>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={cancelar}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                                            type="submit"
                                            onClick={modificarPu}
                                        >
                                            Modificar Post
                                        </button>
                                    </div>
                                </>

                            }
                        </div>
                    </div>
                </div >
            </div>
            {/* <div className="bg-white border-2 border-gray-200 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <img src={imagen.imagen} alt={imagen.descripcion} className="w-full h-64 object-cover mb-4 rounded-lg" />
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">{profile && profile.user_name} - {imagen.fecha_publicacion.substr(0, 10)}</h3>
                {!mismoUser &&
                    <button onClick={like} className="focus:outline-none">
                        {meGusta ? (
                            <HeartIconSolid className="w-6 h-6 text-red-500 transition-colors duration-300 ease-in-out animate-like" />
                        ) : (
                            <HeartIcon className="w-6 h-6 text-gray-500 transition-colors duration-300 ease-in-out hover:text-red-500" />
                        )}
                    </button>
                }

            </div>
             */}

        </>
    );
};

export default ImagenInicio