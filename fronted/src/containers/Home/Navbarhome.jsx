import React, { useContext, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import RegisterModal from './RegisterModal'
import { LoginModal } from './LoginModal'
import { UserContext } from '../../provider/UserContext'

export const Navbarhome = () => {
    const { isOpenR, openReg, isOpenL, openLog } = useContext(UserContext)
    //   const [isOpenR, setIsOpenR] = useState(false);
    // const openLog = () => {
    //     setIsOpenL(true);
    // };

    // const closeLog = () => {
    //     setIsOpenL(false);
    // };

    // const closeReg = () => {
    //     setIsOpenR(false);
    // };
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(i => (i + 1) % images.length);
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);

    const images = [
        "https://picsum.photos/800/400",
        "https://picsum.photos/800/400",
        "https://picsum.photos/800/400"
    ];
    return (
        <>
            {/* Navbar */}
            <div className="relative">
                {isOpenR && (
                    <RegisterModal />
                )}
                {isOpenL && (
                    <LoginModal />
                )}
            </div>
            {/* <nav className="bg-blue-300 py-4 sm:py-2 sm:px-2">
    <div className="container mx-auto flex justify-between items-center px-4">
        <a href="#" className="text-white font-bold text-lg">
            CalisteniaApp
        </a>
        <ul className="flex">
            <li className="mr-6 sm:hidden">
                <select className="bg-blue-700 text-white font-medium rounded-lg text-sm px-4 py-2 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    <option value="" selected disabled hidden>Menu</option>
                    <option value="" onClick={openLog}>Iniciar sesión</option>
                    <option value="" onClick={openReg}>Registrarse</option>
                </select>
            </li>
            <li className="mr-6 hidden sm:block">
                <button type="button" onClick={openLog} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Iniciar Sesion</button>
            </li>
            <li className="mr-6 hidden sm:block">
                <button type="button" onClick={openReg} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registarse</button>
            </li>
        </ul>
    </div>
</nav> */}
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="https://flowbite.com" className="flex items-center">
                        <img src="https://feswc.org/wp-content/uploads/2023/02/Club-Calistenia-Sitges-Logo.png" className="h-8 mr-3" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Calistenia</span>
                    </a>
                    <div className="flex items-center">
                        <a href="#" className="mr-6 text-sm  text-blue-600 dark:text-blue-500 hover:underline" onClick={openLog} >Login</a>
                        <a href="#" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline" onClick={openReg}>Registrase</a>
                    </div>
                </div>
            </nav>

            {/* Contenido con imágenes que cambian cada 3 segundos */}
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-10">
      {/* Agregamos la clase "mt-8" para agregar un margen superior */}
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-4">
          <img
            src="https://wallpapercosmos.com/w/full/7/4/7/1131007-3840x2160-desktop-4k-calisthenics-background-photo.jpg"
            alt="Imagen ilustrativa"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-2">
            Bienvenidos a mi página web
          </h2>
          <p className="text-gray-700 leading-relaxed">
          Bienvenidos a nuestra aplicación web de calistenia, el lugar perfecto para entrenar tu cuerpo sin necesidad de equipos costosos ni de ir al gimnasio. Con nuestra plataforma, podrás acceder a una gran variedad de rutinas de ejercicios diseñadas específicamente para trabajar cada parte de tu cuerpo, desde los músculos más grandes hasta los más pequeños.
          </p>
        </div>
      </div>
    </div>
            {/* <div className="container mx-auto my-8 sm:mx-auto">
                <div className="relative">
                    {images.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            alt={`Imagen ${index + 1}`}
                            className={`sm:w-full absolute top-0 left-0 transition duration-1000 ${currentImageIndex === index ? "opacity-100" : "opacity-0"
                                }`}
                        />
                    ))}
                </div>
            </div> */}

            <footer className="bg-gray-200 py-4 fixed bottom-0 left-0 right-0">
                <div className="container mx-auto px-4">
                    <p className="text-gray-700 text-sm text-center">
                        &copy; 2023 Mi página web. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
            {/* <div className="wrapper">
                <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <Link className="navbar-brand" onClick={inicio}>Calistenia</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={iniciarSesion}>Iniciar sesión</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={registrarse}>Registrarse</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <Home></Home>
                </div>
            </div> */}
        </>
    )
}
