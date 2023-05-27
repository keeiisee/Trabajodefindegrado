import React, { useEffect, useState } from 'react';
import { ParkCard } from './ParkCard';
//si
const Map = ({ radius }) => {
  const defaultCenter = { lat: 37.828962, lng: -0.776630 }; // New York City
  const [parks, setParks] = useState([]);

  const searchNearbyParks = () => {
    if (!window.google) {
      return;
    }

    const map = new window.google.maps.Map(document.createElement('div'));
    const service = new window.google.maps.places.PlacesService(map);

    service.nearbySearch(
      {
        location: defaultCenter,
        radius: radius,
        type: 'park',
        keyword: 'calisthenics',
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setParks(results);
        }
      }
    );
  };

  useEffect(() => {
    searchNearbyParks();
  }, [radius, window.google]);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {parks.map((park) => (
        <ParkCard key={park.place_id} park={park} />
      ))}
    </div>
  );
};

export default Map;