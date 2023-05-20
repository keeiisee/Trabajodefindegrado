import React from 'react'
import { useSelector } from 'react-redux';

const ImagenInicio = ({ imagen, profile, onClick }) => {
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

            <div class=" max-w-lg">
                <div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-3">
                    <a href="#">
                        <img class="cursor-pointer rounded rounded-t-lg" onClick={() => onClick(imagen)} src={imagen.imagen} alt={imagen.descripcion} />
                    
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2">{user.name}</h5>
                        </a>
                        <p class="font-normal text-gray-700 mb-3">{imagen.descripcion} fecha: {imagen.fecha_publicacion}</p>
                    </div>
                </div>
            </div>
        </>



    );
};

export default ImagenInicio