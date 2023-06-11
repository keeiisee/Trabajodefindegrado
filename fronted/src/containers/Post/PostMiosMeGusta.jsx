import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { HeartIcon } from '@heroicons/react/outline';
import { post_like } from '../../actions/post';
const PostMiosMeGusta = ({imagen}) => {
    const dispatch = useDispatch()
    const [meGusta, setMeGusta] = useState(true)
 
    function like() {
        dispatch(post_like(imagen.id, !meGusta))
        setMeGusta(!meGusta)
    }
    return (
        <>
            <motion.div

                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col"
                whileHover={{ scale: 1.00 }}
                transition={{ duration: 0.3 }}
            >
                <div onClick={() => setShowImagePopup(true)} className="relative h-64 w-full mb-4">
                    <img
                        src={imagen.imagen}
                        alt={imagen.descripcion}
                        className="w-full h-full max-w-full max-h-full object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                </div>
        
                <div className="flex-1 flex flex-col">
                    <h2 className="text-xl font-semibold mb-2">
                        {imagen.autor_name && imagen.autor_name} - {imagen.fecha_publicacion}
                    </h2>
                    <p className="mb-2 break-words whitespace-normal">{imagen.descripcion}</p>
                    <div className="flex items-center justify-between">
                        <button onClick={like} className="focus:outline-none">
                            {meGusta ? (
                                <HeartIconSolid className="w-6 h-6 text-red-500 transition-colors duration-300 ease-in-out animate-like" />
                            ) : (
                                <HeartIcon className="w-6 h-6 text-gray-500 transition-colors duration-300 ease-in-out hover:text-red-500" />
                            )}
                        </button>
                    </div>
                </div>

            </motion.div>
        </>

    );
}


export default PostMiosMeGusta