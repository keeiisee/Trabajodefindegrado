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
  
  const location = useLocation();

  useEffect(() => {
    const getQueryParams = () => {
      const searchParams = new URLSearchParams(location.search);
      const searchRadius = parseInt(searchParams.get('searchRadius'), 10) || 1000;
      const province = searchParams.get('province') || 'Lo pagan';
      const city = searchParams.get('city') || 'Murcia';
      
      setGeoEnabled(false);
      setRadius(searchRadius);
      setSelectedRegion({ province: province, city: city });
    };
    
    getQueryParams();
  }, [location]);

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
      <div className="App">
        <Map radius={radius} region={selectedRegion} geoEnabled={geoEnabled} />
      </div>
    </LoadScript>
  );
};