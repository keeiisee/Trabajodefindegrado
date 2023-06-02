import { useState } from "react"
import { UserContext } from "./UserContext"


export const UserProvider = ({ children }) => {
  const [seccion, setSeccion] = useState('uno')
  const [palabras, setPalabras] = useState([]);
  const [isOpenP, setIsOpenP] = useState(false);
  const [isOpenPM, setIsOpenPM] = useState(false);
  const [isOpenL, setIsOpenL] = useState(false);
  const [isOpenR, setIsOpenR] = useState(false);
  const [isOpenParque, setIsOpenParque] = useState(false)
  const openPostM = () => {
    setIsOpenPM(true);
  };
  const closePostM = () => {
    setIsOpenPM(false);
  };
  const openPar = () => {
    setIsOpenParque(true);
  };
  const closePar = () => {
    setIsOpenParque(false);
  };
  const openPos = () => {
    setIsOpenP(true);
  };
  const closePos = () => {
    setIsOpenP(false);
  };
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
    <UserContext.Provider value={{ openPostM,closePostM,isOpenPM,setIsOpenPM, isOpenParque, setIsOpenParque, openPar, closePar, isOpenP, setIsOpenP, openPos, closePos, seccion, setSeccion, palabras, setPalabras, isOpenL, setIsOpenL, isOpenR, setIsOpenR, openLog, closeLog, openReg, closeReg }}>{/* //cualquier hijo del userProvider puede acceder al value */}
      {children}
    </UserContext.Provider>
  )
}
