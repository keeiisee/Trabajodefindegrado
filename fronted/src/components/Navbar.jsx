import React, { useContext, useEffect, useMemo, useState } from 'react'
import { logout, load_personas } from '../actions/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserContext } from '../provider/UserContext';
import { useSelector } from 'react-redux';
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { User } from 'react-feather';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { LogoutIcon, PhotographIcon, SearchIcon, UploadIcon, ViewBoardsIcon } from '@heroicons/react/solid';
import LocationForm from '../parque/LocationForm';
import NewPostForm from '../containers/Post/NewPostForm';
const PalabrasList = ({ palabras, setPalabras }) => (
  <div className="position-relative">
    <ul className="list-group position-absolute top-100 start-0">
      {palabras.map((palabra, index) => (
        <li className="list-group-item" key={index}>
          {palabra.id ? (
            <a
              style={{ whiteSpace: 'nowrap', fontSize: '12px' }}
              onClick={() => setPalabras([])}
              href={`/perfil/${palabra.id}`}
            >
              {palabra.name}
            </a>
          ) : (
            <p style={{ whiteSpace: 'nowrap', fontSize: '12px' }}>{palabra.name}</p>
          )}
        </li>
      ))}
    </ul>
  </div>
);


export const Navbar = () => {
  const { palabras, setPalabras, isOpenP, openPos, openPar, isOpenParque } = useContext(UserContext);
  const dispatch = useDispatch();
  const profile = useSelector(state => state.auth.profile);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [profileI, setProfile] = useState('');
  const navigate = useNavigate();
  const [letras, setLetras] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
      };

      try {
        const responseProfile = await fetch('http://localhost:8000/accounts/profile/', config);
        const dataProfile = await responseProfile.json();
        setProfile(dataProfile);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const logout_user = () => {
    dispatch(logout());
    navigate('/');
  };

  const explorar = () => {
    openPar()
  };

  const onChange = async (e) => {
    setLetras(e.target.value);

    if (e.target.value !== '') {
      const personas = await dispatch(load_personas(e.target.value));
      setPalabras(personas.length !== 0 ? personas : [{ name: 'No se ha encontrado resultado' }]);
    } else {
      setPalabras([]);
    }
  };

  const url = useMemo(() => (profileI.length > 0 ? profileI[0].imagen : ''), [profileI]);

  return (
    <>
      <div className="relative">
        {isOpenParque && (
          <LocationForm />
        )}
      </div>
      <div className="relative">
        {isOpenP && (
          <NewPostForm />
        )}
      </div>

      <nav className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
            <Link to="/paginadeinicio" className="text-3xl font-bold tracking-wide font-sans text-white hover:text-yellow-300 transition duration-300 ease-in-out">
              Cal<span className="text-yellow-500">istenia</span>
            </Link>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex">
                <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                  <div className="max-w-md w-full lg:max-w-xs mb:w-10">
                    <label htmlFor="search" className="sr-only">Buscar Usuarios</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5" />
                      </div>
                      <input onChange={e => onChange(e)} value={letras} onKeyDown={e => { if (e.key === 'Enter') e.preventDefault(); }} id="search" name="search" className="block w-full pl-10 pr-3 py-2 rounded-md leading-5 bg-gray-300 text-black placeholder-black focus:outline-none focus:bg-gray-300 focus:text-black sm:text-sm transition duration-150 ease-in-out" placeholder="Buscar Usuarios" type="search" />
                      <PalabrasList palabras={palabras} />
                    </div>
                  </div>
                </div>
                <ul className="ml-3 flex items-center space-x-6 space-y-0 md:space-y-0 md:space-x-6">
                  {profile ? (
                    <>
                      <li className="text-lg font-medium group">
                        <button type="button" onClick={() => { openPos(); setIsOpen(false); }}><UploadIcon className="h-6 w-6" /></button>
                        <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                      </li>
                      <li className="text-lg font-medium group">
                        <button type="button" onClick={explorar}><img src="http://localhost:8000/static/barraIcons.png" alt="Custom Icon" className="h-6 w-6" /></button>
                        <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                      </li>
                      <li className="text-lg font-medium group">
                        <Link onClick={() => setIsOpen(false)} to="/profile"><img className="w-10 h-10 object-contain " src={url} alt="Foto de Perfil" /></Link>
                        <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="text-lg font-medium group">
                        <Link onClick={() => setIsOpen(false)} to="/crear-perfil"><User size={18} className="inline-block mr-1" /></Link>
                        <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                      </li>
                    </>
                  )}
                  <li className="text-lg lg:text-lg font-medium group">
                    <button type="button" onClick={logout_user}><LogoutIcon className="h-5 w-5" /></button>
                    <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                  </li>
                </ul>
              </div>
            </div>
            <Menu as="div" className="absolute inset-y-0 right-0 flex items-center sm:hidden">
              {({ open }) => (
                <>
                  <Menu.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
                    {!open ? <MenuIcon className="h-6 w-6 text-white" /> : <XIcon className="h-6 w-6 text-white" />}
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className={`${open ? 'block' : 'hidden'} sm:hidden bg-marron-800 divide-y divide-marron-700`}>
                      <div className="px-2 pt-2 pb-3">
                        <ul className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 lg:md:-x-8">
                          {profile ? (
                            <>
                              <li className="text-lg md:text-base lg:text-lg font-medium group text-white">
                                <button type="button" onClick={openPos}>Subir Imagen</button>
                                <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                              </li>
                              <li className="text-lg md:text-base lg:text-lg font-medium group text-white">
                                <Link to="/profile">Perfil</Link>
                                <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                              </li>
                            </>
                          ) : (
                            <li className="text-lg md:text-base lg:text-lg font-medium group text-white">
                              <Link to="/crear-perfil">Crear Perfil</Link>
                              <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                            </li>
                          )}
                          <li className="text-lg md:text-base lg:text-lg font-medium group text-white">
                            <button type="button" className="mr-5 hover:text-gray-900" onClick={logout_user}>Cerrar Sesión</button>
                            <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                          </li>
                          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                            <div className="max-w-md w-full lg:max-w-xs mb:w-10">
                              <label htmlFor="search" className="sr-only">Buscar Usuarios</label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <SearchIcon className="h-5 w-5" />
                                </div>
                                <input
                                  onChange={e => onChange(e)}
                                  value={letras}
                                  onKeyDown={e => { if (e.key === 'Enter') e.preventDefault(); }}
                                  id="search"
                                  name="search"
                                  className="block w-full pl-10 pr-3 py-2 rounded-md leading-5 bg-gray-300 text-black placeholder-black focus:outline-none focus:bg-gray-300 focus:text-black sm:text-sm transition duration-150 ease-in-out"
                                  placeholder="Buscar Usuarios"
                                  type="search"
                                />
                                <PalabrasList palabras={palabras} />
                              </div>
                            </div>
                          </div>
                        </ul>
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>

      </nav>

    </>
  );
}


export default Navbar




