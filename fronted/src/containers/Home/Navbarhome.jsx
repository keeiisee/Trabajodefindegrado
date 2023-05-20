import React, { useContext } from 'react'
import Home from '../Home'
import { Link } from 'react-router-dom'
import { UserContext } from '../../provider/UserContext'

export const Navbarhome = () => {
    const { seccion, setSeccion } = useContext(UserContext)

  const inicio = () => {
    setSeccion('uno');
  }

  const iniciarSesion = () => {
    setSeccion('dos');
  }

  const registrarse = () => {
    setSeccion('tres');
  }
    return (
        <>
            <div className="wrapper">
                <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <Link className="navbar-brand" onClick={inicio}>Calistenia</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={iniciarSesion}>Iniciar sesión</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={registrarse}>Registrarse</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <Home></Home>
                </div>
            </div>
        </>
    )
}
