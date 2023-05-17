import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <>
        <div className="wrapper">
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to='/'>Mi sitio web</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to='/login'>Iniciar sesión</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/signup'>Registrarse</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <section className="bg-light py-5 flex-grow-1">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1 className="display-4">Bienvenido a CalisteniaApp</h1>
          <p className="lead">Pagina donde podras disfrutar del mejor deporte</p>
          <Link to='/login' className="btn btn-primary">Comenzar</Link>
        </div>
        <div className="col-md-6">
        <br />
          <img src="https://picsum.photos/800/600" alt="" className="img-fluid"/>
        </div>
      </div>
    </div>
  </section>

  <section className="bg-secondary py-5 flex-grow-1">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
            <br />
          <h2 className="text-white mb-4">¿Ya tienes una cuenta?</h2>
          <p className="text-white mb-4">Inicia sesión para acceder a tu cuenta.</p>
          <Link to='/login' className="btn btn-outline-light">Iniciar sesión</Link>
        </div>
        <div className="col-md-6">
            <br />
          <h2 className="text-white mb-4">¿Eres nuevo aquí?</h2>
          <p className="text-white mb-4">Regístrate para crear una cuenta nueva.</p>
          <Link to='/signup' className="btn btn-outline-light">Registrarse</Link>
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
    //     <div className="container d-flex justify-content-center align-items-center vh-100">
    //     <div className="border p-5">
    //         <h1 className="text-center mb-4">Bienvenido</h1>
    //         <div className="d-flex justify-content-center">
    //         <Link className="btn btn-primary me-3" to='/login' role='button'>Login</Link>
    //         <Link className="btn btn-success" to='/signup' role='button'>Registrarte</Link>
            
    //         </div>
    //     </div>
    //   </div>
      );
}
export default Home

