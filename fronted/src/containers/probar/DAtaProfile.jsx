import React from 'react'
import Profile1 from './Profile1';

export const DAtaProfile = () => {
    const userData = {
        name: 'John Doe',
        biography: 'Desarrollador de software con experiencia en desarrollo web y aplicaciones móviles.',
        numberOfAchievements: 10,
        phoneNumber: '+1 (123) 456-7890',
        email: 'john.doe@example.com',
        age: 28,
      };
      return (
        <div className="container mx-auto p-4">
          <Profile1 data={userData} />
        </div>
      );
    }
