import React, { useEffect, useState } from 'react'

const ImagenInicio = ({ imagen }) => {
    const [profile, setProfile] = useState(null)
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
                setProfile(dataProfile);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [imagen.autor]);
    return (
        <>
            {/* Aquí puedes agregar tus imágenes */}
            <div className="bg-white border-2 border-gray-200 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <img src={imagen.imagen} alt={imagen.descripcion} className="w-full h-64 object-cover mb-4 rounded-lg" />
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">{profile && profile.user_name} - {imagen.fecha_publicacion.substr(0, 10)}</h3>
            </div>

        </>
    );
};

export default ImagenInicio