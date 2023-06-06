import React, { useEffect, useState } from 'react'
import Map from './Map';
import { LoadScript } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';
//si
const googleMapsApiKey = 'AIzaSyA18Y1G5FH2nDFfkJcI5x_HxJmRGOtubIA';
const libraries = ['places'];
export const Parques = () => {
  const [radius, setRadius] = useState(1000);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [geoEnabled, setGeoEnabled] = useState(false);

  useEffect(() => {
    const getLocalStorageValues = () => {
      const storedRadius = localStorage.getItem('radius');
      const storedProvince = localStorage.getItem('province');
      const storedCity = localStorage.getItem('city');
      const storedGeoEnabled = localStorage.getItem('geoEnabled');

      if (storedRadius) {
        setRadius(parseInt(storedRadius, 10));
      }
      if (storedProvince && storedCity) {
        setSelectedRegion({ province: storedProvince, city: storedCity });
      }
      if (storedGeoEnabled) {
        setGeoEnabled(JSON.parse(storedGeoEnabled));
      }
    };

    getLocalStorageValues();
  }, []);

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
      <div className="App">
        <Map radius={radius} region={selectedRegion} geoEnabled={geoEnabled} />
      </div>
    </LoadScript>
  );
}