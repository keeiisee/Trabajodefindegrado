import React, { useEffect, useState } from 'react'
import FriendList from './FriendList';
import Navbarperfil from './Navbarperfil';
import axios from 'axios';

const friends = [
    {
        id: 1,
        name: 'Alice',
        photo: 'https://wallpapercosmos.com/w/full/7/4/7/1131007-3840x2160-desktop-4k-calisthenics-background-photo.jpg',
    },
    {
        id: 2,
        name: 'Bob',
        photo: 'https://wallpapercosmos.com/w/full/7/4/7/1131007-3840x2160-desktop-4k-calisthenics-background-photo.jpg',
    },
    {
        id: 3,
        name: 'Charlie',
        photo: 'https://wallpapercosmos.com/w/full/7/4/7/1131007-3840x2160-desktop-4k-calisthenics-background-photo.jpg',
    },
    
    // Agrega más amigos aquí...
];

export const MisAmigos = () => {
  const [amigos, setAmigos] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`,
            },
          };
    
          try {
            const responseProfile = await fetch('http://localhost:8000/accounts/profile/', config);
            const dataProfile = await responseProfile.json();
    
            if (dataProfile && dataProfile.length > 0) {
              const amigosArray = dataProfile[0].amigos;              
                const amigosPromise = amigosArray.map(async (amigo) => {
                    
                  try {
                    const response = await axios.get(`http://localhost:8000/accounts/profile/${amigo}/`, config);
                    if (response.data){
                      return response.data;
                    }
                    
                  } catch (error) {
                    console.error(`Error fetching data for friend ${amigo}:`, error);
                  }
                });
    
                Promise.all(amigosPromise).then((fetchAmigos) => {
                  const validAmigos = fetchAmigos.filter((amigo) => amigo !== undefined);
                  setAmigos(validAmigos);
                });
           
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, []);
    
    return (
        <>
            <Navbarperfil></Navbarperfil>
            <div className="sm:ml-64 mr-6">
                <div className="p-4 ml-6 sm:ml-14 border-4 nav-border bg-marron rounded-lg dark:border-gray-700">
                    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                        <h1 className="text-4xl text-center font-semibold mb-8">Lista de Amigos</h1>
                        {/* {amigos.length > 0 && amigos.map((amg, index)=>{
                            return <FriendList key={index} friends={amg} />
                        })} */}
                        <FriendList friends={amigos} />
                    </div>
                </div>



            </div>
        </>

    );
}