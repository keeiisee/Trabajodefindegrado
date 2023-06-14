import React, { useContext, useEffect, useMemo, useState } from 'react'
import { logout, load_personas } from '../actions/auth';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserContext } from '../provider/UserContext';
import { useSelector } from 'react-redux';
import { HomeIcon } from "@heroicons/react/outline";
import { User } from 'react-feather';
import { LogoutIcon, SearchIcon, UploadIcon } from '@heroicons/react/solid';
import LocationForm from '../parque/LocationForm';
import NewPostForm from '../containers/Post/NewPostForm';
import Profile1 from '../containers/Perfil/Profile1';
import CrearPerfil from '../containers/Perfil/CrearPerfil';
import CrearRutina from '../containers/Rutinas/CrearRutina';

const PalabrasList = ({ palabras, cerrar }) => (
  <div className="position-relative z-50">
    <ul className="list-group position-absolute top-100 start-0">
      {palabras.map((palabra, index) => (
        <li className="list-group-item" key={index}>
          {palabra.id ? (
            <a
              style={{ whiteSpace: 'nowrap', fontSize: '12px' }}
              onClick={() => cerrar()}
              href={`/#/perfil/${palabra.id}`}
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
  const { palabras, setPalabras, isOpenP, openPos, openPar, isOpenParque, handleProfileUpdate, updateProfileKey } = useContext(UserContext);
  const dispatch = useDispatch();
  const profile = useSelector(state => state.auth.profile);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [profileI, setProfile] = useState('');
  const navigate = useNavigate();
  const [letras, setLetras] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const navBarPerfil = location.pathname.includes("/profile");

  const [showCrearPerfil, setShowCrearPerfil] = useState(false);
  const handleCrearPerfil = () => {
    setShowCrearPerfil(!showCrearPerfil);
  };

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      };
      try {
        const responseProfile = await fetch(`${apiUrl}/accounts/profile/`, config);
        const dataProfile = await responseProfile.json();
        setProfile(dataProfile);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [updateProfileKey]);
  const cerrar = () => {
    setIsOpen(false);
    setPalabras([])
    setLetras('')
  }
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
  const [modalOpen, setModalOpen] = useState(false);
  const url = useMemo(() => (profileI.length > 0 ? profileI[0].imagen : ''), [profileI]);
  const soli = useMemo(() => (profileI.length > 0 ? profileI[0].solicitudRecibida : []), [profileI]);
  return (
    <>

      {navBarPerfil &&
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
                    <Link to="/profile">
                      <img className="w-10 h-10 rounded-full object-cover" src={url} alt="Foto de Perfil" />
                    </Link>
                    <div
                      className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"
                    />
                  </li>
                </ul>
              </div>

            </div>
          </nav>
          {profileI.length > 0 &&
            <Profile1 datas={profileI[0]} onProfileUpdate={handleProfileUpdate} />
          }

        </>
      }
      {
        !navBarPerfil &&
        <>
          <div className="relative">
            {isOpenParque && (
              <LocationForm cerrar={cerrar} />
            )}
          </div>
          <div className="relative">
            {isOpenP && (
              <NewPostForm setIsOpen={setIsOpen} handleProfileUpdate={handleProfileUpdate} />
            )}
          </div>

          <nav className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 py-4 px-6 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
              <Link to="/paginadeinicio" onClick={() => setShowCrearPerfil(false)} className="text-3xl font-bold tracking-wide font-sans text-white hover:text-yellow-300 transition duration-300 ease-in-out">
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
                        <PalabrasList palabras={palabras} cerrar={cerrar} />
                      </div>
                    </div>
                  </div>
                  <ul className="ml-3 flex items-center space-x-6 space-y-0 md:space-y-0 md:space-x-6">
                    {profile ? (
                      <>
                        <li className="text-lg font-medium group">
                          <button type="button" onClick={() => { setModalOpen(true); }}><img src="https://cdn-icons-png.flaticon.com/512/1373/1373779.png" alt="Custom Icon" className="h-6 w-6" /></button>
                          <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                        </li>
                        <li className="text-lg font-medium group">
                          <button type="button" onClick={() => { openPos(); setIsOpen(false); }}><UploadIcon className="h-6 w-6" /></button>
                          <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                        </li>
                        <li className="text-lg font-medium group">
                          <button type="button" onClick={explorar}><img src="https://cdn-icons-png.flaticon.com/512/4615/4615521.png" alt="Custom Icon" className="h-6 w-6" /></button>
                          <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                        </li>
                        <li>
                          <div className="relative">
                            <Link onClick={() => { setIsOpen(false); handleProfileUpdate() }} to="/profile">
                              <img className="w-10 h-10 rounded-full object-cover" src={url} alt="Foto de Perfil" />
                            </Link>
                            {soli.length > 0 && (
                              <span
                                className="bg-green-500 w-4 h-4 rounded-full absolute top-0 right-0 border-2 border-white heartbeat"
                              ></span>
                            )}
                          </div>

                          <div className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                        </li>

                      </>
                    ) : (
                      <>
                        <li className="text-lg lg:text-lg font-medium group">
                          <button onClick={() => { setIsOpen(false); handleCrearPerfil() }}>
                            <User size={18} className="h-5 w-5" />
                          </button>
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
              <div className="sm:hidden flex items-center">
                <button className="sm:hidden text-white focus:outline-none mr-5" onClick={toggleMenu}>
                  <svg
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                  </svg>
                </button>
                {profile &&
                  <div className="sm:hidden">
                    <Link onClick={() => setIsOpen(false)} to="/profile">
                      <img className="w-10 h-10 rounded-full object-cover" src={url} alt="Foto de Perfil" />
                    </Link>
                    {soli.length > 0 && (
                      <span
                        className="bg-green-500 w-4 h-4 rounded-full absolute top-0 right-0 border-2 border-white heartbeat"
                      ></span>
                    )}
                  </div>
                }
              </div>



            </div>

            {isOpen && (
              <div className="sm:hidden mt-4">
                <ul className="shadow-md">
                  {profile ? (
                    <>
                      <li>
                        <Link onClick={() => setIsOpen(false)} to="/paginadeinicio" className="block px-4 py-2 text-gray-800">
                          <div className="flex justify-between">
                            Inicio
                            <HomeIcon className="h-6 w-6" /> {/* Reemplace HomeIcon con el ícono que desee */}
                          </div>
                        </Link>
                      </li>
                      <li>
                        <a onClick={() => { openPos() }} type='button' className="block px-4 py-2 text-white-500">
                          <div className="flex justify-between">
                            Subir imagen
                            <UploadIcon className="h-6 w-6" />
                          </div>
                        </a>
                      </li>
                      <li>
                        <a type="button" onClick={explorar} className="block px-4 py-2 text-gray-800">
                          <div className="flex justify-between">
                            Buscar Parques
                            <img src="https://cdn-icons-png.flaticon.com/512/4615/4615521.png" alt="Custom Icon" className="h-6 w-6" />
                          </div>
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <a onClick={() => { setIsOpen(false); handleCrearPerfil() }} className="block px-4 py-2 text-gray-800" >
                        <div className="flex justify-between">
                          Crear Perfil
                          <User size={18} className="h-5 w-5" />
                        </div>
                      </a>

                    </>
                  )}
                  <li>
                    <a type="button" onClick={logout_user} className="block px-4 py-2 text-gray-800" >
                      <div className="flex justify-between">
                        Cerrar Sesion
                        <LogoutIcon className="h-5 w-5" />
                      </div>
                    </a>
                  </li>
                  <div className="max-w-md w-full lg:max-w-xs mb:w-10 mt-2">
                    <label htmlFor="search" className="sr-only">Buscar Usuarios</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5" />
                      </div>
                      <input onChange={e => onChange(e)} value={letras} onKeyDown={e => { if (e.key === 'Enter') e.preventDefault(); }} id="search" name="search" className="block w-full pl-10 pr-3 py-2 rounded-md leading-5 bg-gray-300 text-black placeholder-black focus:outline-none focus:bg-gray-300 focus:text-black sm:text-sm transition duration-150 ease-in-out" placeholder="Buscar Usuarios" type="search" />
                      <PalabrasList palabras={palabras} cerrar={cerrar} />
                    </div>
                  </div>
                </ul>
              </div>
            )}
          </nav>
          {modalOpen && <CrearRutina setModalOpen={setModalOpen} handleProfileUpdate={handleProfileUpdate} />}
          {showCrearPerfil && <CrearPerfil onClose={handleCrearPerfil} handleProfileUpdate={handleProfileUpdate} />}
        </>
      }
    </>
  );
}


export default Navbar




