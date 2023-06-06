import React, { useEffect, useMemo, useState } from 'react'
import { NavbarSuperPerfil } from '../../components/NavbarSuperPerfil';
import Profile1 from './Profile1';

export const ConPerfil = () => {
  const [profile, setProfile] = useState("");
  
  const [updateProfileKey, setUpdateProfileKey] = useState(0);

  const handleProfileUpdate = () => {
    setUpdateProfileKey(updateProfileKey + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      };
      try {
        const responseProfile = await fetch('http://localhost:8000/accounts/profile/', config);
        const dataProfile = await responseProfile.json();
        setProfile(dataProfile);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [updateProfileKey]);

  return (
    <>
      {profile && (
        <>
          <NavbarSuperPerfil profile={profile} />
          <Profile1 datas={profile[0]} onProfileUpdate={handleProfileUpdate} />
        </>
      )}
    </>
  );
};
export default ConPerfil