import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbarperfil from '../containers/Perfil/Navbarperfil';
import MediaQuery from 'react-responsive';

export const NavbarSuperPerfil = () => {
    const [isOpen, setIsOpen] = useState(false);
    function toggleMenu() {
        setIsOpen(!isOpen);
    }
    const [profileI, setProfile] = useState("");

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

            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    const url = useMemo(() => {
        if (profileI) {
            return profileI[0].imagen;
        }
        return '';
    }, [profileI]);

    return (
        <>
            <nav className="bg-marron max-w-7 mx-4 mt-4 mb-4 px-2 sm:px-6 lg:px-8 nav-border border-4">
                <div className="max-w-8 mx-auto px-4 mt-4 mb-4 px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16 ">

                        <Link to="/paginadeinicio" className="text-3xl font-bold tracking-wide font-sans hover:BlinkMacSystemFont">
                            Cal<span className="text-white">istenia</span>
                        </Link>

                        <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">

                            <button
                                onClick={toggleMenu}
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
                                aria-label="Main menu"
                                aria-expanded="false"
                            >
                                <svg
                                    className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                                <svg
                                    className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                        </div>

                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex">
                                <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                                </div>
                                <ul className="ml-3 flex items-center space-x-6 space-y-0 md:space-y-0 md:space-x-6 ">
                                    <li className="text-lg  font-medium group">
                                        <Link to="/paginadeinicio"> Volver</Link>

                                        <div
                                            className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"
                                        />
                                    </li>
                                    <li className="text-lg font-medium group">
                                        <Link onClick={() => setIsOpen(false)} to="/profile">
                                            <img className="w-10 h-10 rounded inline-block mr-1" src={url} alt="Foto de Perfil" />
                                        </Link>
                                        <div
                                            className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                </div>

                <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>

                    <div className="px-2 pt-2 pb-3">
                        <ul className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 lg:md:-x-8">

                            <li className="text-lg md:text-base lg:text-lg font-medium group text-white">
                                <Link to="/profile">
                                    Perfil
                                </Link>
                                <div
                                    className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out">
                                </div>
                            </li>


                            <li className="text-lg md:text-base lg:text-lg font-medium group text-white">
                                <a className="mr-5 hover:text-gray-900" href="">
                                    Cerrar Sesion
                                </a>
                                <div
                                    className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out">
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>

            </nav>
            <MediaQuery minDeviceWidth={640}>
                <Navbarperfil></Navbarperfil>
            </MediaQuery>
            {/* {!isMobile && <Navbarperfil />} */}

        </>
    )
}
