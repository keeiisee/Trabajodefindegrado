import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { HeartIcon } from '@heroicons/react/outline';
import { post_like } from '../../actions/post';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import { load_Idprofile } from '../../actions/auth';
const ImageModal = ({ isOpen, onRequestClose, imageSrc, imageAlt, authorId, description }) => {
    const customStyles = {
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0', // Remueve el padding del modal
        },
      };
  
    return (
      <Modal isOpen={isOpen} style={customStyles} contentLabel="Imagen ampliada">
        <div className="flex flex-col items-center justify-center p-4 overflow-auto">
          <div className="relative max-w-[290px]">
            <button
              onClick={onRequestClose}
              className="absolute top-2 right-2 bg-white text-gray-800 rounded-full p-1 hover:bg-gray-100 focus:outline-none"
            >
              <MdClose size={24} />
            </button>
            <img src={imageSrc} alt={imageAlt} className="object-contain max-w-full max-h-[290px] mb-2" />
            <div className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold py-1 px-4 mb-2 rounded shadow-md">
              <a href={`/#/perfil/${authorId}`}>Ver Perfil</a>
            </div>
            <p className="break-all whitespace-normal">{description}</p>
          </div>
        </div>
      </Modal>
    );
  };
  const PostMiosMeGusta = ({ imagen }) => {
    const dispatch = useDispatch();
    const [showImagePopup, setShowImagePopup] = useState(false);
    const [idProf, setIdProf] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        const datosProfile = await dispatch(load_Idprofile());
        setIdProf(datosProfile);
      };
      fetchData();
    }, [dispatch]);
  
    const [meGusta, setMeGusta] = useState(true);
    useEffect(() => {
      if (idProf) {
        setMeGusta(imagen.like.includes(idProf[0].id));
      }
    }, [idProf, imagen.like]);
  
    const like = useCallback(() => {
      dispatch(post_like(imagen.id, !meGusta)).then(() => {
        setMeGusta(!meGusta);
      });
    }, [dispatch, imagen.id, meGusta]);
  
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
              {imagen.autor_name && imagen.autor_name} - {imagen.fecha_publicacion.substring(0, 10)}
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
          <ImageModal
            isOpen={showImagePopup}
            onRequestClose={()=> setShowImagePopup(false)}
            imageSrc={imagen.imagen}
            imageAlt={imagen.descripcion}
            authorId={imagen.autor_id}
            description={imagen.descripcion}
          />
        </motion.div>
      </>
    );
  };
  
  // Envuelve el componente en React.memo para evitar renderizados innecesarios
export default React.memo(PostMiosMeGusta);


