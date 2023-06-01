import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import ImagenInicio from '../Inicio/ImagenInicio';
import { Parques } from '../parque/Parques';
import { publicaionesAmigos } from '../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import BottomNavbar from './probar/BottomNavbar';

export const PaginaDeInicio = () => {
  const profile = useSelector(state => state.auth.profile);
  const [post, setPost] = useState([]);
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

  // Aquí irá el código para mostrar las imágenes y el popup
  return (

    <>
      {/* <div className="App">
        <Dos />
        <Tres />
      </div> */}
      {profile &&
        <div className="mb-4 flex items-center justify-center">
          <label htmlFor="filtro" className="mr-2 text-lg font-medium text-gray-700">
            Filtro:
          </label>
          <div className="relative">
            <select
              id="filtro"
              value={filtro}
              onChange={handleFiltroChange}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              <option value="amigos" defaultChecked>Amigos</option>
              <option value="mis_megusta">Mis me gusta</option>
              <option value="sin_seguir">Sin seguir</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>}

      {post.length <= 0 && (
        <>
          {!profile ? (
            <div className="mt-40 ml-20 mr-20 text-center animate-bounce">
              <h1 className="text-4xl font-bold text-gray-700 animate-pulse">No tienes un perfil</h1>
              <p className="mt-4 text-gray-500">Lo sentimos, crea un perfil.</p>
            </div>
          ) : (
            <div className="mt-40 ml-20 mr-20 text-center animate-bounce">
              <h1 className="text-4xl font-bold text-gray-700 animate-pulse">No hay publicaciones que ver</h1>
              <p className="mt-4 text-gray-500">Lo sentimos, no hay contenido disponible en este momento.</p>
            </div>
          )}
        </>
      )}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            
              {post.map((imagen) => (
                <ImagenInicio key={imagen.id} imagen={imagen} />
              ))}
          
          </div>
        </div>
      </section>
      {/* <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">

        {post.map((imagen) => (
          <ImagenInicio key={imagen.id} imagen={imagen} />
        ))}
      </div> */}
      {/* <BottomNavbar></BottomNavbar> */}
    </>

  )
}
export default PaginaDeInicio;