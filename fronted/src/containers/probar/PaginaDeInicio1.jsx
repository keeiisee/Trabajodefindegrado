import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Post1 from './Post1';
import { IoIosArrowDropdown } from 'react-icons/io';
import { Disclosure } from '@headlessui/react';
const PaginaDeInicio1 = () => {
    const profile = useSelector(state => state.auth.profile);
    const [posts, setPost] = useState([]);
    const [filtro, setFiltro] = useState('amigos');
    useEffect(() => {
        const amigos = async () => {

            try {
                const response = await axios.get('http://localhost:8000/accounts/ultima_publi/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`, // Asumiendo que el token de autenticación se guarda en localStorage
                    },
                });

                setPost(response.data);
            } catch (error) {
                console.error('Error al obtener las últimas publicaciones de los amigos:', error);
            }
        };

        const mg = async () => {
            try {
                const response = await fetch('http://localhost:8000/accounts/publicaciones/favoritas/', {
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
        };

        const noAmigos = async () => {
            try {
                const response = await axios.get('http://localhost:8000/accounts/utlima_publiNoFriend/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                    }
                });

                setPost(response.data);
            } catch (error) {
                console.error('Error al obtener las últimas publicaciones de usuarios no amigos:', error);
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
    const handleFiltroChange = (event) => {
        setFiltro(event.target.value);
    };
    return (
        <>
             {profile && (
        <div className="container px-5 mx-auto mb-8 mt-8">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-center w-full py-2 mt-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                  Filtro: {filtro}{' '}
                  <IoIosArrowDropdown
                    className={`ml-2 transform ${
                      open ? 'rotate-180' : ''
                    } transition-transform duration-300`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="mt-4">
                  <div className="relative w-full max-w-xs mx-auto">
                    <select
                      id="filtro"
                      value={filtro}
                      onChange={handleFiltroChange}
                      className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                    >
                      <option value="amigos" defaultChecked>
                        Amigos
                      </option>
                      <option value="mis_megusta">Mis me gusta</option>
                      <option value="sin_seguir">Sin seguir</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <IoIosArrowDropdown className="h-4 w-4" />
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
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