import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ImagenInicio from '../../Inicio/ImagenInicio';
import OtroNavbarPerfil from '../Perfil/OtroNavbarPerfil';

export const PublicacionDeOtro = () => {

    const [post, setPost] = useState([]);
    const routeParams = useParams()
    useEffect(() => {
        const fetchData = async () => {
          const profileUrl = `http://localhost:8000/accounts/profile/${routeParams.id}/`;
          const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
          };
      
          try {
            const [responseProfile] = await Promise.all([
              fetch(profileUrl, config),
            ]);
            
            const dataProfile = await responseProfile.json();
            
            if (dataProfile.length > 0) {
              const postUrl = `http://localhost:8000/accounts/publicaciones/${dataProfile[0].id}/`;
              const responsePost = await fetch(postUrl, config);
              const dataPost = await responsePost.json();
              setPost(dataPost);
            }
      
          } catch (error) {
            console.log(error);
          }
        }
      
        fetchData();
      }, []);
      

    return (
        <>
            <OtroNavbarPerfil />
            <div className="sm:ml-64 mr-6">
                <div className="p-4 ml-6 sm:ml-14 border-4 nav-border bg-marron rounded-lg dark:border-gray-700">

                    <div className="col">
                        <div className="container mx-auto max-w-screen-lg px-2 py-2">
                            {post.length <= 0 && (
                                <div className="mt-20 ml-20 mr-20 mb-20 text-center animate-bounce">
                                    <h1 className="text-4xl font-bold text-gray-700 animate-pulse">No hay publicaciones que ver</h1>
                                    <p className="mt-4 text-gray-500">Lo sentimos, no hay contenido disponible en este momento.</p>
                                </div>
                            )}
                             <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                                {post.map((imagen) => (
                                    <ImagenInicio key={imagen.id} imagen={imagen}/>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
