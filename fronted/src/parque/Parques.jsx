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
  const searchParams = location.state;

  useEffect(() => {
    if (searchParams) {
      setGeoEnabled(searchParams.useGeolocation)
      setRadius(searchParams.searchRadius);
      setSelectedRegion({ province: searchParams.province, city: searchParams.city });
    }
  }, [searchParams]);

  return (
    <h1>tu madre</h1>
    // <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
    //   <div className="App">
    //     <Map radius={radius} region={selectedRegion} geoEnabled={geoEnabled} />
    //   </div>
    // </LoadScript>
  );
}