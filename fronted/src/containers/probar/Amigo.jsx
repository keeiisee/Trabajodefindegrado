import React from 'react'

const Amigo = ({ name, imageUrl, id }) => {
    function verPerfil(){
        
    }
    return (
        <div
            className={`flex items-center mb-4 pb-4 border-b border-gray-300`}
        >
            <img className="w-12 h-12 rounded-full mr-4" src={imageUrl} alt={`${name}'s profile`} />
            <a href={`/perfil/${id}`} className="font-semibold text-lg">{name}</a>
        </div>
    )
};

export default Amigo