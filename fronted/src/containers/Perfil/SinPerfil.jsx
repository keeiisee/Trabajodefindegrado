import React from 'react'
import { Link } from 'react-router-dom'

export const SinPerfil = () => {
  return (
    <div>No tienes perfil, pagina de creacion, solo saldrá la opcion de un boton y un mensaje
        <Link className="nav-link" to="/crear-perfil">Crear Perfil</Link>
    </div>
  )
}
