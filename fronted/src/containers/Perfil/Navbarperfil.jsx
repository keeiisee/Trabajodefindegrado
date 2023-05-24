import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

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

  return (
    <>

<aside id="default-sidebar" className="border-4 fixed top-55 left-8 z-40 w-64 h-50 col-md-2 " aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
      <ul className="space-y-2 font-medium">
      <div className ="d-flex justify-content-center align-items-center flex-column my-3">
          <img onClick={miPerfil} className="w-50 h-50 rounded" src={url} alt="Foto de Perfil" width="150" />
        </div>
         <li>
            <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className ="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
               <span onClick={modificar} className ="ml-3">Configurar Perfil</span>
            </a>
         </li>
         <li>
            <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className ="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
               <span onClick={notificacion} className ="flex-1 ml-3 whitespace-nowrap">Notificaciones</span>
               <span className ="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{notificaciones.length}</span>
            </a>
         </li>
         <li>
            <a  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className ="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
               <span className ="flex-1 ml-3 whitespace-nowrap">Amigos</span>
            </a>
         </li>
         <li>
            <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className ="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
               <span onClick={misPos} className="flex-1 ml-3 whitespace-nowrap">Publicaciones</span>
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
