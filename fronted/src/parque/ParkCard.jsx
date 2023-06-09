import React, { useEffect, useState } from 'react'
import { PhotoModal } from './PhotoModal';
//si
export const ParkCard = ({ park }) => {
  const { name, vicinity, photos } = park;
  const photoUrl = photos ? photos[0].getUrl({ maxWidth: 300, maxHeight: 200 }) : '';
  const [showDiv, setShowDiv] = useState(false);
  const [id , setId] = useState("")
  const [likes, setLikes] = useState([])
  const [disLikes, setDisLikes] = useState([])
  const [showModal, setShowModal] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [recargar, setRecargar] = useState(0)
  const actu = () =>{
    setRecargar(recargar + 1)
  }

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      };
      try {
        const parques = await fetch(`${apiUrl}/accounts/parqueCalis/view/`, config);
        const dataParque = await parques.json();
 
        const foundItem = dataParque.find(item => item.placeId === park.place_id);
        // Comprueba si se ha encontrado un elemento y guarda su ID en una variable
        setShowDiv(foundItem)
  
        if (foundItem) {
          setId(foundItem.placeId)
          setLikes(foundItem.likes)
          setDisLikes(foundItem.dislikes)
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [showModal, recargar])

  const handleImageError = (e) => {
    e.target.onerror = null; // Evita llamadas repetidas al controlador de errores en caso de que la imagen predeterminada también falle
    e.target.src = 'https://deportesurbanos.com/wp-content/uploads/2020/03/Instalacion-Parque-Calistenia-DUCNT-122.jpg'; 
  };
  

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
        className={`border-2 border-gray-200 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out mb-4 `}
      >
        <div className="relative">
          <img
            src={photoUrl}
            alt={`${park.name} thumbnail`}
            className="w-full h-64 object-cover mb-4 rounded-lg"
            onError={handleImageError}
            onClick={handleClick}
          />

        </div>
        <h3 className="text-lg font-medium">{name}</h3>
        <p>{vicinity}</p>
      </div>

      <PhotoModal show={showModal} onClose={handleCloseModal} photoUrl={photoUrl} name={name} park={park} id={id} enBD={showDiv} likes={likes} disLikes={disLikes} actu={actu}/>
    </div>
  );
};
export default ParkCard