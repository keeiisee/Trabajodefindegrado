import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../provider/UserContext';
import ToggleButton from '../containers/Perfil/ToggleButton';
import { Parques } from './Parques';

const LocationForm = ({ cerrar }) => {
  const navigate = useNavigate()
  const { closePar, actualizarBusqueda} = useContext(UserContext)
  const [formData, setFormData] = React.useState({
    searchRadius: 5,
    province: '',
    city: '',
  });
  const [useGeolocation, setUseGeolocation] = React.useState(true);
  const [searchRadiusError, setSearchRadiusError] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const [missingFieldsError, setMissingFieldsError] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const searchRadius = parseInt(formData.searchRadius);
    if (searchRadius < 5) {
      setSearchRadiusError(true);
    } else {
      setSearchRadiusError(false);
      if (!useGeolocation) {
        if (!formData.province || !formData.city) {
          setMissingFieldsError(true); // Activar el error
          return;
        } else {
          setMissingFieldsError(false); // Desactivar el error
          const { searchRadius, province, city } = formData;

          localStorage.setItem('geoEnabled', useGeolocation);
          localStorage.setItem('searchRadius', searchRadius);
          localStorage.setItem('province', province);
          localStorage.setItem('city', city);
          navigate(`/parques`);
          actualizarBusqueda()
          closePar();
          cerrar();
        }
      }
      const { searchRadius } = formData;
      localStorage.setItem('searchRadius', searchRadius);
      localStorage.setItem('geoEnabled', useGeolocation);
      navigate(`/parques`);
      actualizarBusqueda()
      closePar();
      cerrar();
    }
  };

  const cancelar = () => {
    closePar()
  }

  const updateRangeColor = (event) => {
    const value = ((event.target.value - event.target.min) / (event.target.max - event.target.min)) * 100;
    event.target.style.backgroundImage = `linear-gradient(to right, #4299e1 0%, #4299e1 ${value}%, #d1d5db ${value}%, #d1d5db 100%)`;
  };

  const handleToggle = (state) => {
    setMissingFieldsError(false)
    setUseGeolocation(state);
  };
  return (
    <div
      className="fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
      id="customFormModal"
    >
      <div className="bg-white w-4/5 sm:w-3/5 lg:w-2/5 xl:w-1/3 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Buscar parques de calistenia</h2>
        <div className=" mb-4">
          <label className="inline-flex items-center">

            <ToggleButton
              initialState={true}
              onToggle={handleToggle}
            />

            <span className="ml-2">Usar geolocalización</span>

          </label>
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
                min="5"
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
              <button onClick={handleSubmit} type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Buscar
              </button>
              <button onClick={cancelar} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200">
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
                min="5"
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
                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
                id="province"
                type="text"
                placeholder="Provincia"
                name="province"
                value={formData.province}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
                Ciudad
              </label>
              <input
                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
                id="city"
                type="text"
                placeholder="Ciudad"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              {missingFieldsError && ( // Mostrar el mensaje de error si missingFieldsError es verdadero
                <p className="mt-2 text-red-500 mb-4">Por favor, complete los campos de provincia y ciudad.</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Buscar
              </button>
              <button
                onClick={cancelar}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
              >
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