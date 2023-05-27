import React, { useContext, useEffect, useMemo, useState } from 'react'
import { logout, load_personas } from '../actions/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserContext } from '../provider/UserContext';
import { useSelector } from 'react-redux';
import NewPost from '../containers/Post/NewPost';
import { LogOut, User, Upload, Filter } from 'react-feather';
import { Button } from 'bootstrap';
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
  const { palabras, setPalabras, isOpenP, openPos } = useContext(UserContext);
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
    navigate('/buscarParques');
    window.location.reload();
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
        {isOpenP && (
          <NewPost />
        )}
      </div>
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
                  <div className="max-w-md w-full lg:max-w-xs mb:w-10">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5 13A5.5 5.5 0 1113 7.5a5.51 5.51 0 01-5.5 5.5zm0-1a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
                          />
                        </svg>
                      </div>

                      <input
                        onChange={e => onChange(e)}
                        value={letras}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                          }
                        }}
                        id="search"
                        name="search"
                        className="block w-full pl-10 pr-3 py-2 rounded-md leading-5 bg-gray-300 text-black placeholder-black focus:outline-none focus:bg-gray-300 focus:text-black sm:text-sm transition duration-150 ease-in-out"
                        placeholder="Search"
                        type="search"
                      />
                      <PalabrasList palabras={palabras} />
                    </div>
                  </div>
                </div>
                <ul className="ml-3 flex items-center space-x-6 space-y-0 md:space-y-0 md:space-x-6 ">
                  {profile && (
                    <>
                      <li className="text-lg  font-medium group">
                        <button
                          type="button"
                          onClick={() => {
                            openPos();
                            setIsOpen(false);
                          }}
                        >
                          <Upload size={18} className="inline-block mr-1" />
                        </button>
                        <div
                          className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"
                        />
                      </li>
                      <li className="text-lg  font-medium group">
                        <button
                          type="button"
                          onClick={() => {
                            openPos();
                            setIsOpen(false);
                          }}
                        >
                          <Filter size={18} className="inline-block mr-1" />
                        </button>
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
                    </>
                  )}
                  {!profile && (
                    <>
                      <li className="text-lg  font-medium group">
                        <Link onClick={() => setIsOpen(false)} to="/crear-perfil">
                          <User size={18} className="inline-block mr-1" />
                        </Link>
                        <div
                          className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"
                        />
                      </li>
                      <li className="text-lg lg:text-lg font-medium group">
                        <button type="button" onClick={logout_user}>
                          <LogOut size={18} className="inline-block mr-1" />
                        </button>
                        <div
                          className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"
                        />
                      </li>
                    </>

                  )}
                  <li className="text-lg lg:text-lg font-medium group">
                    <button type="button" onClick={logout_user} >
                      <Upload size={18} className="inline-block mr-1" />
                    </button>
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
              {profile &&
                <>
                  <li className="text-lg md:text-base lg:text-lg font-medium group text-white">
                    <a type='button' onClick={openPos}>Subir Imagen
                    </a>
                    <div
                      className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out">
                    </div>
                  </li>
                  <li className="text-lg md:text-base lg:text-lg font-medium group text-white">
                    <Link to="/profile">
                      Perfil
                    </Link>
                    <div
                      className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out">
                    </div>
                  </li>
                </>
              }
              {!profile && (
                <>
                  <li className="text-lg md:text-base lg:text-lg font-medium group text-white">
                    <Link to="/crear-perfil">
                      Crear Perfil
                    </Link>
                    <div
                      className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out">
                    </div>
                  </li>
                </>

              )}
              <li className="text-lg md:text-base lg:text-lg font-medium group text-white">
                <a className="mr-5 hover:text-gray-900" href="" onClick={logout_user}>
                  Cerrar Sesion
                </a>
                <div
                  className="h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out">
                </div>
              </li>
              <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="max-w-md w-full lg:max-w-xs mb:w-10">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.5 13A5.5 5.5 0 1113 7.5a5.51 5.51 0 01-5.5 5.5zm0-1a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
                        />
                      </svg>
                    </div>
                    <input
                      onChange={e => onChange(e)}
                      value={letras}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                        }
                      }}
                      id="search"
                      name="search"
                      className="block w-full pl-10 pr-3 py-2 rounded-md leading-5 bg-gray-300 text-black placeholder-black focus:outline-none focus:bg-gray-300 focus:text-black sm:text-sm transition duration-150 ease-in-out"
                      placeholder="Search"
                      type="search"
                    />
                    <PalabrasList palabras={palabras} />
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </nav>


      {/* <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="https://flowbite.com" className="flex items-center">
            <img src="https://feswc.org/wp-content/uploads/2023/02/Club-Calistenia-Sitges-Logo.png" className="h-8 mr-3" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Calistenia</span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"  to="/paginadeinicio">
            
              Inicio
            </Link>
            <Link className="mr-5 hover:text-blue-900" to="#">
              Explorar
            </Link>
            {profile &&
              <>
                <a type='button' className="mr-5 hover:text-gray-900" onClick={openPos}>
                  Subir Imagen
                </a>
                <Link className="mr-5 hover:text-gray-900" to="/profile">
                  Perfil
                </Link>
              </>
            }
            {!profile &&
              <>
                <Link className="mr-5 hover:text-gray-900" to="/crear-perfil">
                  Crear Perfil
                </Link>
              </>
            }
            <form className="d-flex">
              <PalabrasList palabras={palabras} />
              <input
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}

                className="form-control me-2"
                onChange={e => onChange(e)}
                type="search"
                placeholder="Buscar usuarios"
                aria-label="Buscar usuarios"
                value={letras}
              />
            </form>
            
            <a className="mr-5 hover:text-gray-900" href="" onClick={logout_user}>
                  Cerrar Sesion
                </a>
          </nav>
        </div>
      </nav> */}

    </>
  );
}


export default Navbar