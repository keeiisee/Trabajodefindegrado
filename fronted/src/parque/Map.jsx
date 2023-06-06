import { useState, useEffect } from 'react';
import ParkCard from './ParkCard';

const sortParksByDistance = (parks, center) => {
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };

  const sortedParks = parks.sort((a, b) => {
    const distanceA = calculateDistance(
      center.lat,
      center.lng,
      a.geometry.location.lat(),
      a.geometry.location.lng()
    );
    const distanceB = calculateDistance(
      center.lat,
      center.lng,
      b.geometry.location.lat(),
      b.geometry.location.lng()
    );

    return distanceA - distanceB;
  });

  return sortedParks;
};
const Map = ({ radius, region, geoEnabled }) => {
  const [parks, setParks] = useState([]);
  const [center, setCenter] = useState(null);
  const [dataParque, setDataParque] = useState([]);
  const [sortedParks, setSortedParks] = useState([]);
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
    
    service.nearbySearch(
      {
        location: center,
        radius: radius * 1000,
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
    console.log(region)
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
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      };
      try {
        const parques = await fetch('http://localhost:8000/accounts/parqueCalis/view/', config);
        const dataParqueJson = await parques.json();
        setDataParque(dataParqueJson);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  useEffect(() => {
    if (dataParque.length > 0) {
      const bannedParkIds = dataParque
        .filter((park) => park.baneado)
        .map((park) => park.placeId);

      const updatedSortedParks = sortParksByDistance(
        parks.filter((park) => !bannedParkIds.includes(park.place_id)),
        center
      ).concat(
        sortParksByDistance(
          parks.filter((park) => bannedParkIds.includes(park.place_id)),
          center
        )
      );

      setSortedParks(updatedSortedParks);
    } else {
      setSortedParks(sortParksByDistance(parks, center));
    }
  }, [parks, dataParque, center]);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedParks = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedParks.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(sortedParks.length / itemsPerPage);
  return (
    <div>
  <div className="flex justify-center mt-4 space-x-4">
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l shadow-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Anterior
    </button>
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r shadow-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Siguiente
    </button>
  </div>
  <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {paginatedParks().map((park) => (
        <ParkCard key={park.place_id} park={park} />
      ))}
    </div>
</div>

  );
};

export default Map;