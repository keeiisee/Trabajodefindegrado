import React, { useEffect, useState } from 'react'

const ImagenInicio = ({ imagen }) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            };
            try {
                const responseProfile = await fetch(`http://localhost:8000/accounts/profiles/profiles/${imagen.autor}/`, config);
                const dataProfile = await responseProfile.json();
                const responseUser = await fetch(`http://localhost:8000/accounts/usuarios/${dataProfile.user}/`, config);
                const dataUser = await responseUser.json()
                setUser(dataUser);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [imagen.autor]);
    return (
        <>
            {/* <div className="border border-gray-400 rounded">
            
          <div className="bg-yellow-100 p-1 rounded-lg hover:bg-red-500">
        <img
          src={imagen.url}
          alt={imagen.descripcion}
          className="w-full h-auto cursor-pointer rounded"
          onClick={() => onClick(imagen)}
        />
      </div>
      </div> */}
           

                {/* Aquí puedes agregar tus imágenes */}
                <div className="bg-white border-2 border-gray-200 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
                    <img src={imagen.imagen} alt={imagen.descripcion} className="w-full h-64 object-cover mb-4 rounded-lg" />
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">{user && user.name} - {imagen.fecha_publicacion.substr(0, 10)}</h3>
                </div>
          
            {/* <div
            key={imagen.id}
            className="relative overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={imagen.imagen}
              alt={imagen.descripcion}
              className="w-full h-full object-cover"
            />
            
             <div className="absolute inset-0 bg-gray-800 bg-opacity-75 transition-opacity duration-300 flex items-end justify-center px-4 py-2 opacity-0 hover:opacity-100">
            
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-marron px-4 py-2">
            <p className="text-gray-900 text-base font-bold">{user && user.name} - {imagen.fecha_publicacion.substr(0,10)}</p>
            
            </div>
          </div> */}
        </>



    );
};

export default ImagenInicio