import React, { useEffect, useMemo, useState } from 'react'
import Navbarperfil from '../Perfil/Navbarperfil';
import Navbar from '../../components/Navbar';
import { connect } from 'react-redux';
import ImagenInicio from '../../Inicio/ImagenInicio';


export const MisPublicaciones = () => {
    const [profile, setProfile] = useState("");
    const [post, setPost] = useState([]);
    const [popupImagen, setPopupImagen] = useState(null);

    const handleClick = (imagen) => {
        setPopupImagen(imagen);
    };

    const handleClosePopup = () => {
        setPopupImagen(null);
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
                const responseProfile = await fetch('http://localhost:8000/accounts/profile/', config);
                const dataProfile = await responseProfile.json();
                setProfile(dataProfile)
                if (dataProfile) {
                    const responsePost = await fetch(`http://localhost:8000/accounts/publicaciones/${dataProfile[0].id}/`, config);
                    const dataPost = await responsePost.json()
                    setPost(dataPost)
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    const url = useMemo(() => {
        if (profile) {
            return profile[0].imagen;
        }
        return '';
    }, [profile]);

    return (

        <>


            <Navbarperfil imagen={url} />


            <div className="sm:ml-64 mr-6">
                <div className="p-4 ml-6 sm:ml-14 border-4 nav-border bg-marron rounded-lg dark:border-gray-700">

                    <div className="col">

                        <div className="container mx-auto max-w-screen-lg px-2 py-2">
                            {post.length <= 0 && (


                                <div className="mt-20 ml-20 mr-20 mb-20 text-center animate-bounce">
                                    <h1 className="text-4xl font-bold text-gray-700 animate-pulse">No hay publicaciones que ver</h1>
                                    <p className="mt-4 text-gray-500">Lo sentimos, no hay contenido disponible en este momento.</p>
                                </div>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-cols-min">
                                {post.map((imagen) => (
                                    <ImagenInicio key={imagen.id} imagen={imagen} onClick={handleClick} />
                                ))}
                            </div>
                            {popupImagen && <PopupInicio imagen={popupImagen} onClose={handleClosePopup} />}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="col">
                        <div className="container mx-auto max-w-screen-lg px-2 py-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-cols-min">
                                {post.map((imagen) => (
                                    <ImagenInicio key={imagen.id} imagen={imagen} onClick={handleClick} />
                                ))}
                            </div>
                            {popupImagen && <PopupInicio imagen={popupImagen} onClose={handleClosePopup} />}
                        </div>
                    </div> */}

        </>
    )
}

export default MisPublicaciones