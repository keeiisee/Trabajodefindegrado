import React, { useState } from 'react'
import ParqueModal from './ParqueModal';
import { useSelector } from 'react-redux';

const ParqueCard = ({ park }) => {
  const user = useSelector(state => state.auth.user);
  const isLikeActive = park.parque.likes.includes(user.id);
  const isDislikeActive = park.parque.dislikes.includes(user.id);
  
  const getBackgroundClass = () => {
    if (isLikeActive) {
      return 'bg-green-400';
    }
    if (isDislikeActive) {
      return 'bg-red-400';
    }
    return 'bg-blue-400';
  };
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClick = () => {
    handleOpenModal();
  };
  return (

    <div>
      <div
        className={`border-2 border-gray-200 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out mb-4 ${getBackgroundClass()}`}
      >
        <div className="relative">
          <img
            src={park.parque.imagenUrl ? park.parque.imagenUrl : 'https://deportesurbanos.com/wp-content/uploads/2020/03/Instalacion-Parque-Calistenia-DUCNT-122.jpg'}
            alt={park.parque.name}
            className="w-full h-64 object-cover mb-4 rounded-lg"
            onClick={handleClick}
          />

        </div>

        <h3 className="text-lg font-medium">{park.parque.nombre}</h3>
        <p className="text-sm text-gray-600">{park.parque.descripcion}</p>
        <p className="text-sm text-gray-500 mt-2">
          Fecha de registro: {park.fecha}
        </p>
      </div>
      <ParqueModal show={showModal} fecha={park.fecha} onClose={handleCloseModal} photoUrl={park.parque.imagenUrl ? park.parque.imagenUrl : 'https://deportesurbanos.com/wp-content/uploads/2020/03/Instalacion-Parque-Calistenia-DUCNT-122.jpg'} name={park.parque.nombre} likes={park.parque.likes} disLikes={park.parque.dislikes} id={park.parque.placeId} idReserva={park.id}/>
    </div>
  );
};
export default ParqueCard 