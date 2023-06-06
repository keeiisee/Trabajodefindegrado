import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../provider/UserContext';

const LocationForm = () => {
  const navigate = useNavigate()
  const { closePar } = useContext(UserContext)
  const [formData, setFormData] = React.useState({
    searchRadius: 0,
    province: '',
    city: '',
  });

  const [useGeolocation, setUseGeolocation] = React.useState(true);
  const [searchRadiusError, setSearchRadiusError] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.preventDefault();
  const searchRadius = parseInt(formData.searchRadius);
  if (searchRadius < 5) {
    setSearchRadiusError(true);
  } else {
    setSearchRadiusError(false);
    const { searchRadius, province, city } = formData;
    navigate('/parques');
    closePar()
    // window.location.reload()
    // Aquí puedes realizar la acción para enviar el formulario
  }
};
    
  
  const cancelar = () =>{
    closePar()
  }
  const toggleGeolocation = () => {
    setUseGeolocation((prev) => !prev);
  };

  const updateRangeColor = (event) => {
    const value = ((event.target.value - event.target.min) / (event.target.max - event.target.min)) * 100;
    event.target.style.backgroundImage = `linear-gradient(to right, #4299e1 0%, #4299e1 ${value}%, #d1d5db ${value}%, #d1d5db 100%)`;
  };

  return (
    <div
      className="fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
      id="customFormModal"
    >
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-2xl font-semibold mb-4">Buscar</h2>
        <div className="mb-4">
          <button
            onClick={toggleGeolocation}
            className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${useGeolocation ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
          >
            {useGeolocation ? 'Usar geolocalización' : 'No usar geolocalización'}
          </button>
        </div>
        {useGeolocation ? (
          <>
            <div className="mb-4">
              <label htmlFor="searchRadius" className="block text-gray-700 font-bold mb-2">
                Radio de búsqueda
              </label>
              <input
                required
                type="range"
                id="searchRadius"
                name="searchRadius"
                min="1"
                max="100"
                value={formData.searchRadius}
                onChange={(event) => {
                  updateRangeColor(event);
                  handleChange(event);
                }}
                className="appearance-none w-full h-2 bg-blue-500 rounded"
                style={{
                  backgroundImage: 'linear-gradient(to right, #4299e1 0%, #4299e1 0%, #d1d5db 0%, #d1d5db 100%)',
                }}
              />
              {searchRadiusError && <p className="text-red-500">El radio de búsqueda debe ser mayor o igual a 5 km</p>}
              <span className="text-gray-700">{formData.searchRadius} km</span>
            </div>
            <div className="flex items-center justify-between my-4">
              <button onClick={handleSubmit} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Buscar
              </button>
              <span className="mx-4"></span>
              <button onClick={cancelar} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cancelar
              </button>
            </div>
          </>


        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="searchRadius" className="block text-gray-700 font-bold mb-2">
                Radio de búsqueda
              </label>
              <input
                required
                type="range"
                id="searchRadius"
                name="searchRadius"
                min="1"
                max="100"
                value={formData.searchRadius}
                onChange={(event) => {
                  updateRangeColor(event);
                  handleChange(event);
                }}
                className="appearance-none w-full h-2 bg-blue-500 rounded"
                style={{
                  backgroundImage: 'linear-gradient(to right, #4299e1 0%, #4299e1 0%, #d1d5db 0%, #d1d5db 100%)',
                }}
              />
              {searchRadiusError && <p className="text-red-500">El radio de búsqueda debe ser mayor o igual a 5 km</p>}
              <span className="text-gray-700">{formData.searchRadius} km</span>
            </div>
            <div className="mb-4">
              <label htmlFor="province" className="block text-gray-700 font-bold mb-2">
                Provincia
              </label>
              <input
                required
                type="text"
                id="province"
                name="province"
                placeholder="Provincia"
                value={formData.province}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
                Ciudad
              </label>
              <input
                required
                type="text"
                id="city"
                name="city"
                placeholder="Ciudad"
                value={formData.city}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between my-4">
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Buscar
              </button>
              <span className="mx-4"></span>
              <button onClick={cancelar} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};


export default LocationForm;