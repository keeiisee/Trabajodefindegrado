import React, { useEffect, useMemo, useState } from 'react'
import Navbarperfil from '../Perfil/Navbarperfil';
import Navbar from '../../components/Navbar';
import { useSelector } from 'react-redux';
import ImagenInicio from '../../Inicio/ImagenInicio';
import { NavbarSuperPerfil } from '../../components/NavbarSuperPerfil';
import MediaQuery from 'react-responsive';
import BottomNavbar from '../probar/BottomNavbar';
import Post1 from '../probar/Post1';

export const MisPublicaciones = () => {
    const [post, setPost] = useState([]);
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

    return (

        <>

            {/* <NavbarSuperPerfil /> */}
            {/* <div className="sm:ml-64 mr-6">
                <div className="p-4 ml-6 sm:ml-14 border-4 nav-border bg-marron rounded-lg dark:border-gray-700"> */}
                    {post.length <= 0 && (
                        <div className="mt-20 ml-20 mr-20 mb-20 text-center animate-bounce">
                            <h1 className="text-4xl font-bold text-gray-700 animate-pulse">No hay publicaciones que ver</h1>
                            <p className="mt-4 text-gray-500">Lo sentimos, no hay contenido disponible en este momento.</p>
                        </div>
                    )}
                    {/* <section className="text-gray-600 body-font">
                        <div className="container px- py-24 mx-auto">
                            <div className="flex flex-wrap -m-5">

                                {post.map((imagen) => (
                                    <ImagenInicio key={imagen.id} imagen={imagen} />
                                ))}

                            </div>
                        </div>
                    </section> */}
                    <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
                        {post.map((post) => (
                            <div
                                key={post.id}
                                className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                            >
                                <Post1 imagen={post} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
                {/* </div>
            </div> */}
            {/* <MediaQuery minDeviceWidth={1095}>
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
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-cols-min">
                                    {post.map((imagen) => (
                                        <ImagenInicio key={imagen.id} imagen={imagen} user={user} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MediaQuery>
            <MediaQuery maxWidth={1094}>
                <MediaQuery minDeviceWidth={898}>
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
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-cols-min">
                                        {post.map((imagen) => (
                                            <ImagenInicio key={imagen.id} imagen={imagen} user={user} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery maxWidth={897}>

                    <MediaQuery minDeviceWidth={771}>
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
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 auto-cols-min">
                                            {post.map((imagen) => (
                                                <ImagenInicio key={imagen.id} imagen={imagen} user={user} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MediaQuery>
                    <MediaQuery maxWidth={770}>

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
                                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 auto-cols-min">
                                            {post.map((imagen) => (
                                                <ImagenInicio key={imagen.id} imagen={imagen} user={user} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MediaQuery>
                </MediaQuery>
            </MediaQuery> */}

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
            {/* <BottomNavbar></BottomNavbar> */}
        </>
    )
}

export default MisPublicaciones