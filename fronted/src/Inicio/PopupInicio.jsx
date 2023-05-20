import React from 'react'

export const PopupInicio = ( {imagen, onClose}) => {
    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-4 rounded-lg">
            <button onClick={onClose} className="float-right text-xl">×</button>
            <img src={imagen.imagen} alt={imagen.descripcion} className="w-full h-auto" />
            <p className="text-center">{imagen.descripcion}</p>
          </div>
        </div>
      );
    };
export default PopupInicio
