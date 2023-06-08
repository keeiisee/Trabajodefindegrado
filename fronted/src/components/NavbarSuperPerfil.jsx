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
            </nav>
        </>
    )
}
