import { useState } from "react"
import { UserContext } from "./UserContext"


export const UserProvider = ({children}) => {
    const [seccion, setSeccion] = useState('uno')
    const [palabras, setPalabras] = useState([]);
    return (
      <UserContext.Provider value={{seccion, setSeccion, palabras, setPalabras}}>{/* //cualquier hijo del userProvider puede acceder al value */} 
          {children}
      </UserContext.Provider>
    )
  }
