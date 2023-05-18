import React from 'react'
import { Link } from 'react-router-dom'

export const Navbarperfil = ({imagen, name}) => {
  return (
    <>
            <div className="col-12 col-md-2 bg-light border-end">
                <div className="d-flex justify-content-center align-items-center flex-column my-3">
                    <img src={imagen} className="img-fluid rounded-circle my-3" alt="Foto de perfil" width="150"/>
                </div> 
                <h3>{name}</h3>

                <div className="d-flex flex-column mt-3">
                    <button className="btn btn-primary mb-2">Inicio</button>
                    <button className="btn btn-primary mb-2">Publicaciones</button>
                    <Link to='modificar-perfil' className="btn btn-primary">Modificar Perfil</Link>
                </div>
            </div>
        
    </>
  )
}
export default Navbarperfil
