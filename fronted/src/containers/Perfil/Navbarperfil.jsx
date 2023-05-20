import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

export const Navbarperfil = ({imagen}) => {
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate()
  
  const modificar = () =>{
    navigate("/modificar-perfil")
  }
  const miPerfil = () =>{
    navigate("/profile")
  }
  const misPos = () =>{
    navigate("/mispublicaciones")
  }
  
  return (
    <>
            <div className="col-12 col-md-2 bg-light border-end">
                <div className="d-flex justify-content-center align-items-center flex-column my-3">
                    <img src={imagen} className="img-fluid rounded-circle my-3" alt="Foto de perfil" width="150"/>
                </div> 
                <h3>{user && user.name}</h3>

                <div className="d-flex flex-column mt-3">
                    <button className="btn btn-primary mb-2" onClick={miPerfil}>Inicio</button>
                    <button className="btn btn-primary mb-2" onClick={misPos}>Publicaciones</button>
                    <button className="btn btn-primary mb-2" onClick={modificar}>Modificar Perfil</button>
                </div>
            </div>
        
    </>
  )
}

export default Navbarperfil
