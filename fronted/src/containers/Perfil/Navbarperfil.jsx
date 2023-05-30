import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { CogIcon, HeartIcon, UserGroupIcon, BellIcon, NewspaperIcon } from '@heroicons/react/solid';
export const Navbarperfil = () => {
  const [profile, setProfile] = useState("");
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
  function misAmigos (){
    navigate('/misAmigos')
  }
  const url = useMemo(() => {
    if (profile) {
      return profile[0].imagen;
    }
    return '';
  }, [profile]);

  const notificaciones = useMemo(() => {
    if (profile) {
      return profile[0].solicitudRecibida;
    }
    return '';
  }, [profile]);

  const navigate = useNavigate()
  const notificacion = () => {
    navigate("/profile/notificaciones-recibidas")
  }
  const modificar = () => {
    navigate("/profile/modificar-perfil")
  }
  const miPerfil = () => {
    navigate("/profile")
  }
  const misPos = () => {
    navigate("/profile/mispublicaciones")
  }
  const misPosMg = () => {
    navigate("/profile/misMeGusta")
  }
  return (
    <>
{/* <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="space-y-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center space-x-2">
                    <CogIcon className="h-5 w-5" />
                    <span>Configuración</span>
                </button>

                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center space-x-2">
                    <NewspaperIcon className="h-5 w-5" />
                    <span>Publicación</span>
                </button>

                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center space-x-2">
                    <HeartIcon className="h-5 w-5" />
                    <span>Like</span>
                </button>

                <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded flex items-center space-x-2">
                    <UserGroupIcon className="h-5 w-5" />
                    <span>Amigos</span>
                </button>

                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded flex items-center space-x-2">
                    <BellIcon className="h-5 w-5" />
                    <span>Notificaciones</span>
                </button>
            </div>
        </div> */}
<aside id="default-sidebar" className="border-4 fixed top-55 left-8 z-40 w-64 h-50 col-md-2 " aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
      <ul className="space-y-2 font-medium">
      <div className ="d-flex justify-content-center align-items-center flex-column my-3">
          <img onClick={miPerfil} className="w-50 h-50 rounded" src={url} alt="Foto de Perfil" width="150" />
        </div>
         <li>
            <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <CogIcon className="h-5 w-5" />
               <span onClick={modificar} className ="ml-3">Configurar Perfil</span>
            </a>
         </li>
         <li>
            <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <BellIcon className="h-5 w-5" />
               <span onClick={notificacion} className ="flex-1 ml-3 whitespace-nowrap">Notificaciones</span>
               <span className ="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{notificaciones.length}</span>
            </a>
         </li>
         <li>
            <a  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <UserGroupIcon className="h-5 w-5" />
               <span onClick={misAmigos} className ="flex-1 ml-3 whitespace-nowrap">Amigos</span>
            </a>
         </li>
         <li>
            <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <NewspaperIcon className="h-5 w-5" />
               <span onClick={misPos} className="flex-1 ml-3 whitespace-nowrap">Publicaciones</span>
            </a>
         </li>
         <li>
            <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <HeartIcon className="h-5 w-5" />
               <span onClick={misPosMg} className="flex-1 ml-3 whitespace-nowrap">Mis Me gusta</span>
            </a>
         </li>
      </ul>
   </div>
</aside>

      {/* <div className =" col-12 col-md-2 bg-light border-end">
        <div className ="d-flex justify-content-center align-items-center flex-column my-3">
          <img className ="w-50 h-50 rounded" src={imagen} alt="Foto de Perfil" width="150" />
        </div>
        <h3>{user && user.name}</h3>

        <div className ="d-flex flex-column mt-3">
          <button className="btn btn-primary mb-2" onClick={miPerfil}>Inicio</button>
          <button className="btn btn-primary mb-2" onClick={misPos}>Publicaciones</button>
          <button className="btn btn-primary mb-2" onClick={modificar}>Modificar Perfil</button>
        </div>
      </div> */}

    </>
  )
}

export default Navbarperfil
