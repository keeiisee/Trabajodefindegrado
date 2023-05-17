import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import { UserContext } from '../provider/UserContext'

export const Home = () => {
  const {seccion, setSeccion} = useContext(UserContext)

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
          {
            seccion === 'uno' &&
            <section className="bg-light py-5 flex-grow-1">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <h1 className="display-4">Bienvenido a CalisteniaApp</h1>
                    <p className="lead">Pagina donde podras disfrutar del mejor deporte</p>
                    <Link onClick={iniciarSesion} className="btn btn-primary">Comenzar</Link>
                  </div>
                  <div className="col-md-6">
                    <br />
                    <img src="https://picsum.photos/800/600" alt="" className="img-fluid" />
                  </div>
                </div>
              </div>
            </section>
          }
          {seccion === 'dos' &&
            <Login></Login>
          }
          {
            seccion === 'tres' &&
            <Signup></Signup>
          }

          <section className="bg-secondary py-5 flex-grow-1">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <br />
                  <h2 className="text-white mb-4">¿Ya tienes una cuenta?</h2>
                  <p className="text-white mb-4">Inicia sesión para acceder a tu cuenta.</p>
                  <Link onClick={iniciarSesion} className="btn btn-outline-light">Iniciar sesión</Link>
                </div>
                <div className="col-md-6">
                  <br />
                  <h2 className="text-white mb-4">¿Eres nuevo aquí?</h2>
                  <p className="text-white mb-4">Regístrate para crear una cuenta nueva.</p>
                  <Link onClick={registrarse} className="btn btn-outline-light">Registrarse</Link>
                </div>
              </div>
            </div>
          </section>
          <footer className="bg-dark text-white py-3">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <p className="mb-0">&copy; 2023 Mi sitio web</p>
                </div>
                <div className="col-md-6">
                  <ul className="list-inline mb-0 text-md-end">
                    <li className="list-inline-item"><a href="#">Política de privacidad</a></li>
                    <li className="list-inline-item"><a href="#">Términos de servicio</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
export default Home

