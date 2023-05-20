import { useState } from "react"
import { UserContext } from "./UserContext"


export const UserProvider = ({ children }) => {
  const [seccion, setSeccion] = useState('uno')
  const [palabras, setPalabras] = useState([]);

  const [isOpenL, setIsOpenL] = useState(false);
  const [isOpenR, setIsOpenR] = useState(false);
  const openLog = () => {
    setIsOpenL(true);
  };

  const closeLog = () => {
    setIsOpenL(false);
  };
  const openReg = () => {
    setIsOpenR(true);
  };

  const closeReg = () => {
    setIsOpenR(false);
  };
  return (
    <UserContext.Provider value={{ seccion, setSeccion, palabras, setPalabras, isOpenL, setIsOpenL, isOpenR, setIsOpenR, openLog, closeLog, openReg, closeReg }}>{/* //cualquier hijo del userProvider puede acceder al value */}
      {children}
    </UserContext.Provider>
  )
}
