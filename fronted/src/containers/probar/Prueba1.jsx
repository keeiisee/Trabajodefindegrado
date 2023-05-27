import React, { useState } from 'react'
import { Home, TrendingUp, Video, Book, Clock, Menu } from 'react-feather';
const Prueba1 = () => {
 

  const user = {
    name: 'Nombre de usuario',
    imagen: 'https://via.placeholder.com/640x480',
    descripcion: 'Esta es una descripción de la imagen.',
  };
  const trendingTopics = [
    'Tema de tendencia 1',
    'Tema de tendencia 2',
    'Tema de tendencia 3',
    'Tema de tendencia 4',
    'Tema de tendencia 5',
  ];
  const [tweets, setTweets] = useState([
    {
      id: 1,
      user: {
        name: 'Usuario Ejemplo',
        username: 'usuarioejemplo',
        avatar: 'https://via.placeholder.com/48',
      },
      text: 'Este es un tweet de ejemplo.',
    },
    {
      id: 2,
      user: {
        name: 'Otro Usuario',
        username: 'otrousuario',
        avatar: 'https://via.placeholder.com/48',
      },
      text: 'Aquí hay otro tweet de ejemplo.',
    },
  ]);

  const handleNewTweet = (text) => {
    const newTweet = {
      id: tweets.length + 1,
      user: {
        name: 'Nuevo Usuario',
        username: 'nuevousuario',
        avatar: 'https://via.placeholder.com/48',
      },
      text,
    };
    setTweets([newTweet, ...tweets]);
  };
  const [isOpen, setIsOpen] = useState(false);

       return (
    <>
     <div className="flex h-screen">
      <button
        className="fixed top-4 left-4 md:hidden z-50 p-1 text-gray-600 hover:text-blue-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </button>
      <div
        className={`w-60 h-full bg-gray-100 shadow-md transform ${
          isOpen ? 'translate-x-0' : '-translate-x-60'
        } transition-transform duration-300 ease-in-out md:translate-x-0 z-40`}
      >
        {/* Código del menú de navegación aquí */}
        <div className="flex items-center justify-center p-4">
          <img src="tu_logo_aqui.png" alt="Logo" className="h-10 w-auto" />
        </div>
        <nav className="text-gray-600">
          <ul>
            <li className="p-4 flex items-center">
              <Home className="md:hidden" />
              <a href="#" className="ml-4 hidden md:inline-block hover:text-blue-600">
                Inicio
              </a>
            </li>
            <li className="p-4 flex items-center">
              <TrendingUp className="md:hidden" />
              <a href="#" className="ml-4 hidden md:inline-block hover:text-blue-600">
                Tendencias
              </a>
            </li>
            <li className="p-4 flex items-center">
              <Video className="md:hidden" />
              <a href="#" className="ml-4 hidden md:inline-block hover:text-blue-600">
                Suscripciones
              </a>
            </li>
            <li className="p-4 flex items-center">
              <Book className="md:hidden" />
              <a href="#" className="ml-4 hidden md:inline-block hover:text-blue-600">
                Biblioteca
              </a>
            </li>
            <li className="p-4 flex items-center">
              <Clock className="md:hidden" />
              <a href="#" className="ml-4 hidden md:inline-block hover:text-blue-600">
                Historial
              </a>
            </li>
          </ul>
        </nav>
      </div>

      
      <div className="container mx-auto p-4 w-full ml-0 md:ml-60 z-10">
        <div className="bg-white border-2 border-gray-200 p-4 rounded-lg shadow-md flex flex-col items-center">
          <img src={user.imagen} alt={user.descripcion} className="w-64 h-64 object-cover mb-4 rounded-lg" />
          <h3 className="text-lg font-medium">{user.name}</h3>
          <p className="mt-2 text-gray-600">{user.descripcion}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Prueba1