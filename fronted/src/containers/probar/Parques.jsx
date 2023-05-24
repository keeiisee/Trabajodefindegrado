import React, { useState } from 'react'
import Map from './Map';
import SearchRadius from './SearchRadius';
import { LoadScript } from '@react-google-maps/api';

export const Parques = () => {
    const [radius, setRadius] = useState(1000);
    const [selectedRegion, setSelectedRegion] = useState(null);
    
    return (
        <LoadScript googleMapsApiKey="AIzaSyA18Y1G5FH2nDFfkJcI5x_HxJmRGOtubIA" libraries={['places']}>
        <div className="App">
          <SearchRadius setRadius={setRadius} />
          <Map radius={radius} />
        </div>
      </LoadScript>
    );
  }