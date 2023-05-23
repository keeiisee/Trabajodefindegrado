import React from 'react'
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
const ImagenInicio = ({ imagen,  onClick }) => {
    const user = useSelector(state => state.auth.user);
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
            <div
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
            <p className="text-gray-900 text-base font-bold">{user.name} - {imagen.fecha_publicacion.substr(0,10)}</p>
            
            </div>
          </div>
        </>



    );
};

export default ImagenInicio