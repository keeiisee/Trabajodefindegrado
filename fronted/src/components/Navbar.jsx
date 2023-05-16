import React from 'react'
import { load_user, login, logout } from '../actions/auth';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

export const Navbar = ({ logout, isAuthenticated, login }) => {
  const navigate = useNavigate()
  const logout_user = () => {
      logout();
      navigate('/');
  };
  const perfil = () => {
    login()
    navigate('/profile');
  };
  const inicio = () => {
    navigate('/paginadeinicio');
  };
  const subir = () =>{
    navigate('/pp')
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
            <a className="nav-link active" aria-current="page" href="" onClick={inicio}>Inicio</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Explorar</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="" onClick={subir}>Subir</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="" onClick={perfil}>Perfil</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="" onClick={logout_user}>Cerrar Sesion</a>
          </li>
        </ul>
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar"/>
          <button className="btn btn-outline-success" type="submit">Buscar Amigos</button>
        </form>
      </div>
    </div>
  </nav>
    </>
  )
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login,  logout })(Navbar)