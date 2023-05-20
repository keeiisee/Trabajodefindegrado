import React from 'react'

const ImagenInicio = ({ imagen, onClick }) => {
    return (
        <img
          src={imagen.url}
          alt={imagen.descripcion}
          className="w-full h-auto cursor-pointer"
          onClick={() => onClick(imagen)}
        />
        
      );
    };

export default ImagenInicio