import React, { useState } from 'react'
import CrearRutina from './CrearRutina';
import Modal from './Modal';


const Medio = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="flex items-center justify-center p-4">
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Crear Rutina
          </button>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <CrearRutina />
        </Modal>
      </div>
    );
  };

export default Medio