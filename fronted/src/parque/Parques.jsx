import React, { useEffect, useState } from 'react'
import Map from './Map';
import SearchRadius from './SearchRadius';
import { LoadScript } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';
//si
export const Parques = () => {
  const [radius, setRadius] = useState(1000);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [geoEnabled, setGeoEnabled] = useState(false);

  const location = useLocation();
  const searchParams = location.state;

  useEffect(() => {
    if (searchParams) {
      setGeoEnabled(searchParams.geoEnabled)
      setRadius(searchParams.radius || 10000);
      setSelectedRegion({ province: searchParams.province, city: searchParams.city });
    }
  }, [searchParams]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyA18Y1G5FH2nDFfkJcI5x_HxJmRGOtubIA" libraries={['places']}>
      <div className="App">
        <SearchRadius setRadius={setRadius} />
        <Map radius={radius} region={selectedRegion} geoEnabled={geoEnabled} />
      </div>
    </LoadScript>

  );
}