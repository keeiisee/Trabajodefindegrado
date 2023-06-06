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
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      };
      try {
        const parques = await fetch('http://localhost:8000/accounts/parqueCalis/view/', config);
        const dataParque = await parques.json();

        const foundItem = dataParque.find(item => item.placeId === park.place_id);

        // Comprueba si se ha encontrado un elemento y guarda su ID en una variable
        let foundId;
        setShowDiv(foundItem)
        if (foundItem) {
          foundId = foundItem;
          setId(foundId.id)
          setLikes(foundId.likes)
          setDisLikes(foundId.dislikes)
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  const handleImageError = (e) => {
    e.target.onerror = null; // Evita llamadas repetidas al controlador de errores en caso de que la imagen predeterminada también falle
    e.target.src = 'https://wallpapercosmos.com/w/full/f/5/1/1130764-2121x1414-desktop-hd-calisthenics-background-photo.jpg'; // Reemplaza esto con la ruta de tu imagen predeterminada
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

      <PhotoModal show={showModal} onClose={handleCloseModal} photoUrl={photoUrl} name={name} park={park} id={id} enBD={showDiv} likes={likes} disLikes={disLikes}/>
    </div>
  );
};
export default ParkCard