import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LocationForm = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [geoEnabled, setGeoEnabled] = useState(false);
    const [radius, setRadius] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
  
    const toggleForm = () => {
      setFormVisible(!formVisible);
    };
  
    const toggleGeoEnabled = () => {
      setGeoEnabled(!geoEnabled);
    };
  
    const handleRadiusChange = (e) => {
      setRadius(e.target.value);
    };
  
    const handleProvinceChange = (e) => {
      setProvince(e.target.value);
    };
  
    const handleCityChange = (e) => {
      setCity(e.target.value);
    };
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
      e.preventDefault();
     navigate('/parques', {state: { radius, province, city, geoEnabled }})
    };
  
    return (
      <div>
        <button onClick={toggleForm}>
          {formVisible ? 'Cerrar formulario' : 'Abrir formulario'}
        </button>
        {formVisible && (
          <div>
            <button onClick={toggleGeoEnabled}>
              {geoEnabled ? 'Desactivar geolocalización' : 'Usar geolocalización'}
            </button>
            {geoEnabled ? (
              <> 
              <p>La geolocalización está activada.</p>
              <button onClick={handleSubmit}>Buscar</button>
              </>
             
              
            ) : (
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="radius">Radio:</label>
                  <input
                    type="number"
                    id="radius"
                    min="100"
                    max="50000"
                    step="100"
                    defaultValue="1000"
                    value={radius}
                    onChange={handleRadiusChange}
                  />
                </div>
                <div>
                  <label htmlFor="province">Provincia:</label>
                  <input
                    type="text"
                    id="province"
                    name="province"
                    value={province}
                    onChange={handleProvinceChange}
                  />
                </div>
                <div>
                  <label htmlFor="city">Ciudad:</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={city}
                    onChange={handleCityChange}
                  />
                </div>
                <button type="submit">Buscar</button>
                {/* Agrega más campos si es necesario */}
              </form>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default LocationForm;