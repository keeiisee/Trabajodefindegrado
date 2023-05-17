import React, { useState } from 'react'
import { logout, load_personas } from '../actions/auth';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';

export const Navbar = ({ logout, load_personas }) => {
  const navigate = useNavigate()
  const [persona, setPersona] = useState('')
  const logout_user = () => {
    logout();
    navigate('/');
  };
  const onChange = (e) => {
    setPersona(e.target.value);
  }
  const buscarGente = (e) => {
    e.preventDefault();
    load_personas(persona)
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Calistenia</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/paginadeinicio">Inicio</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Explorar</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pp">Subir</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Perfil</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="" onClick={logout_user}>Cerrar Sesion</a>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" onChange={e => onChange(e)} type="search" placeholder="Buscar" aria-label="Buscar" value={persona} />
              <div className="input-group-append">
                <span className="input-group-text me-2" id="sugerencias"></span>
              </div>
              <button className="btn btn-outline-success" onClick={buscarGente} type="submit">Buscar Gente</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}

export default connect(null, { logout, load_personas })(Navbar)