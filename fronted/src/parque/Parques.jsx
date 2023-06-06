import React, { useEffect, useState } from 'react'
import Map from './Map';
import { LoadScript } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';
//si
const googleMapsApiKey = 'AIzaSyA18Y1G5FH2nDFfkJcI5x_HxJmRGOtubIA';
const libraries = ['places'];
export const Parques = () => {
  // const [radius, setRadius] = useState(1000);
  // const [selectedRegion, setSelectedRegion] = useState(null);
  // const [geoEnabled, setGeoEnabled] = useState(false);
  
  // const location = useLocation();
  // const searchParams = location.state;

  // useEffect(() => {
  //   if (searchParams) {
  //     setGeoEnabled(searchParams.useGeolocation)
  //     setRadius(searchParams.searchRadius);
      // setSelectedRegion({ province: 'Lo pagan', city: 'Murcia' });
  //   }
  // }, [searchParams]);

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
      <div className="App">
        <Map radius={10} region={{ province: 'Lo pagan', city: 'Murcia' }} geoEnabled={false} />
      </div>
    </LoadScript>
  );
}