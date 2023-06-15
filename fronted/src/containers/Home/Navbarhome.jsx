import React, { useContext, useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import RegisterModal from './RegisterModal'
import { LoginModal } from './LoginModal'
import { UserContext } from '../../provider/UserContext'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/auth'

export const Navbarhome = () => {
  const { isOpenR, openReg, isOpenL, openLog } = useContext(UserContext);
  const navigate = useNavigate()
  const [notification, setNotification] = useState(null);
  const [imagenActual, setImagenActual] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setImagenActual((imagenActual) => (imagenActual + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);
  const dispatch = useDispatch()
  const logout_user = () => {
    dispatch(logout());
    navigate('/');
  };
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const images = [
    'https://wallpapercosmos.com/w/full/7/4/7/1131007-3840x2160-desktop-4k-calisthenics-background-photo.jpg',
    'https://wallpapercosmos.com/w/full/f/5/1/1130764-2121x1414-desktop-hd-calisthenics-background-photo.jpg',
    'https://wallpapercosmos.com/w/full/c/d/9/1130832-1920x1080-desktop-full-hd-calisthenics-wallpaper-photo.jpg',
  ];

  const smallImages = [
    'https://sabadellgimnastic.com/wp-content/uploads/2022/09/joven-practicando-calistenia-en-un-gym-al-aire-libre-2022-03-08-01-24-24-utc-scaled.jpg',
    'https://i.pinimg.com/originals/8b/4f/26/8b4f26ee6240b3f74a6c71d95168c547.jpg',
    'https://wallpapercosmos.com/w/full/b/7/7/1130821-1365x2048-phone-hd-calisthenics-wallpaper-image.jpg',
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <div className="relative">
        {isOpenR && <RegisterModal setNotification={setNotification} />}
        {isOpenL && <LoginModal />}
      </div>
      <nav className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 py-4 px-6 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/paginadeinicio" className="text-2xl font-bold tracking-wide font-sans text-white hover:text-yellow-300 transition duration-300 ease-in-out">
            Calis<span className="text-yellow-500">Connect</span>
          </Link>
          {isAuthenticated ? (
            <ul className="flex items-center space-x-4 sm:space-x-6">
              <>
                <li className="text-base sm:text-lg font-medium group">
                  <a
                    type="button"
                    onClick={() => {
                      navigate('/paginadeinicio');
                    }}
                    className="text-white hover:text-yellow-300 transition-colors duration-200"
                  >
                    Entrar
                  </a>
                </li>
                <li className="text-base sm:text-lg font-medium group">
                  <a
                    type="button"
                    onClick={logout_user}
                    className="text-white hover:text-yellow-300 transition-colors duration-200"
                  >
                    Cerrar Sesion
                  </a>
                </li>
              </>
            </ul>
          ) : (
            <ul className="flex items-center space-x-4 sm:space-x-6">
              <>
                <li className="text-base sm:text-lg font-medium group">
                  <a
                    type="button"
                    onClick={openLog}
                    className="text-white hover:text-yellow-300 transition-colors duration-200"
                  >
                    Login
                  </a>
                </li>
                <li className="text-base sm:text-lg font-medium group">
                  <a
                    type="button"
                    onClick={openReg}
                    className="text-white hover:text-yellow-300 transition-colors duration-200"
                  >
                    Registrarse
                  </a>
                </li>
              </>
            </ul>
          )}
        </div>
      </nav>
      {notification && (
        <div className="notification-popup">
          Recibirás un correo de confirmación en breve.
        </div>
      )}
      <div
        className="flex-grow w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${isLargeScreen ? images[imagenActual] : smallImages[imagenActual]
            })`,
        }}
      ></div>

      <footer className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 py-4 px-6 text-white">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Calistenia. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};