import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Post1 from './Post/Post1';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const PaginaDeInicio1 = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const profile = useSelector(state => state.auth.profile);
    const [posts, setPost] = useState([]);
    const [filtro, setFiltro] = useState('amigos');
    useEffect(() => {

        const amigos = async () => {
            if (profile) {
                try {
                    const response = await axios.get('https://trabajodefindegrado-production-1dd0.up.railway.app/accounts/ultima_publi/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `JWT ${localStorage.getItem('access')}`, // Asumiendo que el token de autenticación se guarda en localStorage
                        },
                    });

                    setPost(response.data);
                } catch (error) {
                    console.error('Error al obtener las últimas publicaciones de los amigos:', error);
                }
            }

        };

        const mg = async () => {
            if (profile) {
                try {
                    const response = await fetch('https://trabajodefindegrado-production-1dd0.up.railway.app/accounts/publicaciones/favoritas/', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `JWT ${localStorage.getItem('access')}`,
                        }
                    });
                    const publicacionesJson = await response.json();
                    setPost(publicacionesJson);
                } catch (error) {
                    console.error('Error al obtener las publicaciones favoritas:', error);
                }
            }

        };

        const noAmigos = async () => {
            if (profile) {
                try {
                    const response = await axios.get('https://trabajodefindegrado-production-1dd0.up.railway.app/accounts/utlima_publiNoFriend/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `JWT ${localStorage.getItem('access')}`,
                        }
                    });

                    setPost(response.data);
                } catch (error) {
                    console.error('Error al obtener las últimas publicaciones de usuarios no amigos:', error);
                }
            }

        };
        if (filtro === 'amigos') {
            amigos();
        }

        if (filtro === 'mis_megusta') {
            mg();
        }

        if (filtro === 'sin_seguir') {
            noAmigos();
        }
    }, [filtro]);
   
    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
        switch (newValue) {
            case 0:
                setFiltro('amigos');
                break;
            case 1:
                setFiltro('mis_megusta');
                break;
            case 2:
                setFiltro('sin_seguir');
                break;
            default:
                setFiltro('amigos');
        }
    };
    return (
        <>
            {profile && (

                <div className="container px-5 mx-auto mb-8 mt-8">
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Amigos" />
                        <Tab label="Explorar" />
                        <Tab label="Rutinas" />
                    </Tabs>
                </div>
            )}
            {posts.length <= 0 && (
                <>
                    {!profile ? (
                        <div className="mt-40 ml-20 mr-20 text-center animate-bounce">
                            <h1 className="text-4xl font-bold text-gray-700 animate-pulse">
                                No tienes un perfil
                            </h1>
                            <p className="mt-4 text-gray-500">
                                Lo sentimos, crea un perfil.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-40 ml-20 mr-20 text-center animate-bounce">
                            <h1 className="text-4xl font-bold text-gray-700 animate-pulse">
                                No hay publicaciones que ver
                            </h1>
                            <p className="mt-4 text-gray-500">
                                Lo sentimos, no hay contenido disponible en este momento.
                            </p>
                        </div>
                    )}
                </>
            )}

            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
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

export default PaginaDeInicio1