import React, { useContext, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { LogIn, UserPlus } from 'react-feather';
import RegisterModal from './RegisterModal'
import { LoginModal } from './LoginModal'
import { UserContext } from '../../provider/UserContext'
import { CSSTransition } from 'react-transition-group';
export const Navbarhome = () => {
    const { isOpenR, openReg, isOpenL, openLog } = useContext(UserContext);

    const [imagenActual, setImagenActual] = useState(0);
    useEffect(() => {
      const intervalId = setInterval(() => {
        setImagenActual(imagenActual => (imagenActual + 1) % images.length);
      }, 3000);
      return () => clearInterval(intervalId);
    }, []);
    const images = [
      'https://wallpapercosmos.com/w/full/7/4/7/1131007-3840x2160-desktop-4k-calisthenics-background-photo.jpg',
      'https://wallpapercosmos.com/w/full/f/5/1/1130764-2121x1414-desktop-hd-calisthenics-background-photo.jpg',
      'https://wallpapercosmos.com/w/full/c/d/9/1130832-1920x1080-desktop-full-hd-calisthenics-wallpaper-photo.jpg',
    ];
  
    return (
      <>
        <div className="relative">
          {isOpenR && <RegisterModal />}
          {isOpenL && <LoginModal />}
        </div>
        <nav className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 py-4 px-6 shadow-md">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/paginadeinicio" className="text-3xl font-bold tracking-wide text-white">
              Calistenia
            </Link>
  
            <div className="flex">
              <ul className="flex items-center space-x-6 space-y-0 md:space-y-0 md:space-x-6">
                <>
                  <li className="text-lg font-medium group">
                    <a
                      href="#"
                      onClick={openLog}
                      className="text-white hover:text-yellow-300 transition-colors duration-200"
                    >
                      Login
                    </a>
                  </li>
                  <li className="text-lg font-medium group">
                    <a
                      href="#"
                      onClick={openReg}
                      className="text-white hover:text-yellow-300 transition-colors duration-200"
                    >
                      Registrarse
                    </a>
                  </li>
                </>
              </ul>
            </div>
          </div>
        </nav>
  
        <main className="flex-grow">
          {/* Contenido con imágenes que cambian cada 3 segundos */}
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-24 sm:mt-40">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-4">
                <CSSTransition
                  in={true}
                  appear={true}
                  timeout={1000}
                  classNames="fade"
                >
                  <img
                    src={images[imagenActual]}
                    alt="Imagen"
                    className="rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-110"
                  />
                </CSSTransition>
              </div>
              <div className="md:w-1/2 p-4">
                <CSSTransition
                  in={true}
                  appear={true}
                  timeout={1000}
                  classNames="fade"
                >
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      Bienvenidos a mi página web
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Bienvenidos a nuestra aplicación web de calistenia, el lugar
                      perfecto para entrenar tu cuerpo sin necesidad de equipos
                      costosos ni de ir al gimnasio. Con nuestra plataforma, podrás
                      acceder a una gran variedad de rutinas de ejercicios diseñadas
                      específicamente para trabajar cada parte de tu cuerpo, desde los
                      músculos más grandes hasta los más pequeños.
                    </p>
                  </div>
                </CSSTransition>
              </div>
            </div>
          </div>
        </main>

  
        <footer className="bg-gray-200 py-4 fixed bottom-0 left-0 right-0">
          <div className="container mx-auto px-4">
            <p className="text-gray-700 text-sm text-center">
              &copy; 2023 Mi página web. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </>
    );
  };
  