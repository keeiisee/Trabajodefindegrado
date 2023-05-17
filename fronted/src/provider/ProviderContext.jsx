import { useState } from "react"
import { UserContext } from "./UserContext"


export const UserProvider = ({children}) => {
    const [seccion, setSeccion] = useState('uno')
    
    return (
      <UserContext.Provider value={{seccion, setSeccion}}>{/* //cualquier hijo del userProvider puede acceder al value */} 
          {children}
      </UserContext.Provider>
    )
  }
