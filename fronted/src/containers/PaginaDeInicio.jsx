import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import ImagenInicio from '../Inicio/ImagenInicio';
import { Parques } from '../parque/Parques';
import { publicaionesAmigos } from '../actions/auth';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export const PaginaDeInicio = () => {
  const [popupImagen, setPopupImagen] = useState(null);
  const [profile, setProfile] = useState("");
  const [post, setPost] = useState([]);
  const dispatch = useDispatch();

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

        if (dataProfile && dataProfile.length > 0) {
          const amigosArray = dataProfile[0].amigos;
            const postsPromises = amigosArray.map(async (amigo) => {
              const body = {
                user_id: amigo,
              };

              try {
                const response = await axios.post('http://localhost:8000/accounts/ultima_publi/', body, config);
                if (response.data){
                  return response.data;
                }
                
              } catch (error) {
                console.error(`Error fetching data for friend ${amigo}:`, error);
              }
            });

            Promise.all(postsPromises).then((fetchedPosts) => {
              const validPosts = fetchedPosts.filter((post) => post !== undefined);
              setPost(validPosts);
            });
       
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  // Aquí irá el código para mostrar las imágenes y el popup
  return (

    <>
      {/* <div className="App">
        <Dos />
        <Tres />
      </div> */}
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

      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {post.map((imagen) => (
          <ImagenInicio key={imagen.id} imagen={imagen} />
        ))}
      </div>
    </>
  )
}
export default PaginaDeInicio;