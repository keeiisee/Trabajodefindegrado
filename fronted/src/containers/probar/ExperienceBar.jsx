import React, { useContext, useEffect } from 'react';
import { addLevel } from '../../actions/nivelUsuairo';
import { useDispatch } from 'react-redux';
import { UserContext } from '../../provider/UserContext';
const ExperienceBar = ({ level, experience, userId }) => {
    const dispatch = useDispatch();
    const { handleProfileUpdate, updateProfileKey } = useContext(UserContext);
    useEffect(() => {
      if (level < MAX_LEVEL && calculateXpPercentage() >= 100) {
        dispatch(addLevel(userId))
        .then(()=>{
            handleProfileUpdate()
        })
      }
    }, [level, experience]);
  
    const MAX_LEVEL = 10; // Modifica el valor a 100 para que el nivel máximo sea 100
    const BASE_XP = 100;
  
    const calculateXpPercentage = () => {
      if (level >= MAX_LEVEL) {
        return 100;
      }
  
      let levelXp = BASE_XP;
      for (let i = 1; i < level; i++) {
        levelXp *= 1.5;
      }
      return Math.min((experience / levelXp) * 100, 100);
    };

    const barColor = level === MAX_LEVEL ? "bg-blue-500" : "bg-green-500";
  
    return (
      <div className="w-full bg-gray-300 rounded h-4">
        <div
          className={`${barColor} h-4 rounded`} // Utiliza la variable barColor para cambiar el color de la barra
          style={{ width: `${calculateXpPercentage()}%` }}
        ></div>
      </div>
    );
  };

export default ExperienceBar;

