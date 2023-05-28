import { useState, useEffect } from 'react';
import ParkCard from './ParkCard';
import LocationForm from './LocationForm';

const Map = ({ radius, region, geoEnabled }) => {
  const [parks, setParks] = useState([]);
  const [center, setCenter] = useState(null);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  };

  const searchNearbyParks = () => {
    if (!window.google || !center) {
      return;
    }

    const map = new window.google.maps.Map(document.createElement('div'));
    const service = new window.google.maps.places.PlacesService(map);
    console.log(radius)
    service.nearbySearch(
      {
        location: center,
        radius: radius,
        keyword: 'parque de calistenia',
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setParks(results);
        }
      }
    );
  };


 
  useEffect(() => {
    if (!geoEnabled) {
      let address = '';

      if (region.province) {
        address += region.province;
      }
      
      if (region.city) {
        if (address) address += ', ';
        address += region.city;
      }
     
      if (address) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            const location = results[0].geometry.location;
            setCenter({
              lat: location.lat(),
              lng: location.lng(),
            });
          }
        });
      } else {
        getCurrentLocation();
      }
    } else {
      getCurrentLocation();
    }
  }, [region]);

  useEffect(() => {
    if (center) {
      searchNearbyParks();
    }
  }, [region, window.google, center]);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <LocationForm></LocationForm>
      {parks.map((park) => (
        <ParkCard key={park.place_id} park={park} />
      ))}
    </div>
  );
};

export default Map;