import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import ImagenInicio from '../Inicio/ImagenInicio';
import imagenesInicio from '../Inicio/imagenesInicio.json';

export const PaginaDeInicio = () => {
  const [popupImagen, setPopupImagen] = useState(null);

  const handleClick = (imagen) => {
    setPopupImagen(imagen);
  };

  const handleClosePopup = () => {
    setPopupImagen(null);
  };

  const [profile, setProfile] = useState("");
  const [post, setPost] = useState([]);

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
        if (dataProfile && dataProfile.length > 0) {
          const responsePost = await fetch(`http://localhost:8000/accounts/publicaciones/${dataProfile[0].id}/`, config);
          const dataPost = await responsePost.json()
          setPost(dataPost)
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);


  // Aquí irá el código para mostrar las imágenes y el popup
  return (
    <>
      {post.length <= 0 && (
  <>
    {profile.length <= 0 ? (
      <div className="mt-40 ml-20 mr-20 text-center animate-bounce">
        <h1 className="text-4xl font-bold text-gray-700 animate-pulse">No tienes un perfil</h1>
        <p className="mt-4 text-gray-500">Lo sentimos, crea un perfil.</p>
      </div>
    ) : (
      <div className="mt-40 ml-20 mr-20 text-center animate-bounce">
        <h1 className="text-4xl font-bold text-gray-700 animate-pulse">No hay publicaciones que ver</h1>
        <p className="mt-4 text-gray-500">Lo sentimos, no hay contenido disponible en este momento.</p>
      </div>
    )}
  </>
)}


      <div className="container mx-auto max-w-screen-lg px-2 py-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-cols-min">
          {post.map((imagen) => (
            <ImagenInicio key={imagen.id} imagen={imagen} />
          ))}
        </div>
      </div>


      {/* <div className="App">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {post.map((imagen) => (
            <ImagenInicio key={imagen.id} imagen={imagen} onClick={handleClick} />
          ))}
        </div>
        {popupImagen && <PopupInicio imagen={popupImagen} onClose={handleClosePopup} />}
      </div> */}
    </>
  )
}
export default PaginaDeInicio;