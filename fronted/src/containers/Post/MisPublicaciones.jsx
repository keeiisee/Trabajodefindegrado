import React from 'react'
import PostMiosPublic from './PostMiosPublic';

export const MisPublicaciones = ({imga = [], profile, otro}) => {
    const imagenesOrdenadas = imga.slice().sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion));

    return (
      <>
        {imagenesOrdenadas.length <= 0 && (
          <div className="mt-20 ml-20 mr-20 mb-20 text-center animate-bounce">
            <h1 className="text-4xl font-bold text-gray-700 animate-pulse">No hay publicaciones que ver</h1>
            <p className="mt-4 text-gray-500">Lo sentimos, no hay contenido disponible en este momento.</p>
          </div>
        )}
  
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
              {imagenesOrdenadas.map((post) => (
                <div
                  key={post.id}
                  className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  <PostMiosPublic imagen={post} profile={profile} otro={otro} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  };

export default MisPublicaciones