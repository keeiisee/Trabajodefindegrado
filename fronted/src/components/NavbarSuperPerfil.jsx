import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';

export const NavbarSuperPerfil = ({ profile: profileProp }) => {
    const [isOpen, setIsOpen] = useState(false);
    function toggleMenu() {
      setIsOpen(!isOpen);
    }
    const [profile, setProfile] = useState(profileProp);
    useEffect(() => {
      if (profileProp) {
        setProfile(profileProp);
      } else {
        const fetchData = async () => {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${localStorage.getItem("access")}`,
            },
          };
          try {
            const responseProfile = await fetch(
              "http://localhost:8000/accounts/profile/",
              config
            );
            const dataProfile = await responseProfile.json();
            setProfile(dataProfile);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }
    }, [profileProp]);
  
    const url = useMemo(() => {
      if (profile) {
        return profile[0].imagen;
      }
      return "";
    }, [profile]);
    return (
        <>
            <nav className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 py-4 px-6 shadow-md">
                <div className="container mx-auto flex items-center justify-between">
                    <Link to="/paginadeinicio" className="text-3xl font-bold tracking-wide font-sans text-white hover:text-yellow-300 transition duration-300 ease-in-out">
                        Cal<span className="text-yellow-500">istenia</span>
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
                                        <img className="w-10 h-10 object-contain "  src={url} alt="Foto de Perfil" />
                                    </Link>
                                    <div
                                        className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"
                                    />
                                </li>
                            </ul>
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
        </>
    )
}
