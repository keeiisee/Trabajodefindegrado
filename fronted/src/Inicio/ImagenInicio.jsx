import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { post_like } from '../actions/post';
import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';

const ImagenInicio = ({ imagen }) => {
    const dispatch = useDispatch()
    const [profile, setProfile] = useState(null)
    const [mismoUser, setMismoUser] = useState(false)
    const [meGusta, setMeGusta] = useState(false)
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
                const responseUser = await fetch(`http://localhost:8000/accounts/profile/`, config);
                const dataUser = await responseUser.json()

                if (dataUser[0].user_id === dataProfile.user_id){
                    setMismoUser(true)
                } else if (imagen.like.includes(dataUser[0].id)){
                    setMeGusta(true)
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [imagen.autor]);

    function like(){
        dispatch(post_like(imagen.id, !meGusta))
        setMeGusta(!meGusta)
    }

    return (
        <>
            <div className="bg-white border-2 border-gray-200 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <img src={imagen.imagen} alt={imagen.descripcion} className="w-full h-64 object-cover mb-4 rounded-lg" />
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">{profile && profile.user_name} - {imagen.fecha_publicacion.substr(0, 10)}</h3>
                {!mismoUser &&
                   <button onClick={like} className="focus:outline-none">
                   {meGusta ? (
                       <HeartIconSolid className="w-6 h-6 text-red-500 transition-colors duration-300 ease-in-out animate-like" />
                   ) : (
                       <HeartIcon className="w-6 h-6 text-gray-500 transition-colors duration-300 ease-in-out hover:text-red-500" />
                   )}
               </button>
                }
                
            </div>

        </>
    );
};

export default ImagenInicio