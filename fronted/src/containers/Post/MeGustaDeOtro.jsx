import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import Post1 from './Post1';

const MeGustaDeOtro = () => {
    const routeParams = useParams()
    const [publicacionesFavoritas, setPublicacionesFavoritas] = useState([]);

    useEffect(() => {
        const obtenerPublicacionesFavoritas = async () => {
            try {      
                const response = await fetch('https://trabajodefindegrado-production-1dd0.up.railway.app/accounts/publicacionesDeOtro/favoritas/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                    },
                    body: JSON.stringify({'id': routeParams.id})
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
        </>
    )
}

export default MeGustaDeOtro