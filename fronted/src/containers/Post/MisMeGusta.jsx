import React, { useEffect, useState } from 'react'
import { NavbarSuperPerfil } from '../../components/NavbarSuperPerfil';
import ImagenInicio from '../../Inicio/ImagenInicio';
import Post1 from '../probar/Post1';

const MisMeGusta = () => {

    const [publicacionesFavoritas, setPublicacionesFavoritas] = useState([]);

    useEffect(() => {
        const obtenerPublicacionesFavoritas = async () => {
            try {
                const response = await fetch('http://localhost:8000/accounts/publicaciones/favoritas/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                    }
                });
                const publicacionesJson = await response.json();
                setPublicacionesFavoritas(publicacionesJson);
            } catch (error) {
                console.error('Error al obtener las publicaciones favoritas:', error);
            }
        };

        obtenerPublicacionesFavoritas();
    }, []);
    return (

        <>

            {/* <NavbarSuperPerfil />
            <div className="sm:ml-64 mr-6">
                <div className="p-4 ml-6 sm:ml-14 border-4 nav-border bg-marron rounded-lg dark:border-gray-700"> */}
            {publicacionesFavoritas.length <= 0 && (
                <div className="mt-20 ml-20 mr-20 mb-20 text-center animate-bounce">
                    <h1 className="text-4xl font-bold text-gray-700 animate-pulse">No hay publicaciones que ver</h1>
                    <p className="mt-4 text-gray-500">Lo sentimos, no hay contenido disponible en este momento.</p>
                </div>
            )}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
                        {publicacionesFavoritas.map((post) => (
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
            {/* <section className="text-gray-600 body-font">
                        <div className="container px- py-24 mx-auto">
                            <div className="flex flex-wrap -m-5">

                                {publicacionesFavoritas.map((imagen) => (
                                    <ImagenInicio key={imagen.id} imagen={imagen} />
                                ))}

                            </div>
                        </div>
                    </section> */}
            {/* <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                        {publicacionesFavoritas.map((imagen) => (
                            <ImagenInicio key={imagen.id} imagen={imagen} />
                        ))}
                    </div> */}
            {/* </div>
            </div> */}
        </>
    )
}

export default MisMeGusta