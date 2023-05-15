import React from 'react'
import { logout } from '../actions/auth';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const PaginaDeInicio = ({ logout, isAuthenticated }) => {
    const navigate = useNavigate()
    const logout_user = () => {
        logout();
        navigate('/');
    };
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
            <a className="nav-link active" aria-current="page" href="#">Inicio</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Explorar</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Subir</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Perfil</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={logout_user}>Cerrar Sesion</a>
          </li>
        </ul>
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar"/>
          <button className="btn btn-outline-success" type="submit">Buscar</button>
        </form>
      </div>
    </div>
  </nav>
  <div className="container my-4">
    <div className="row">
      <div className="col-6">
        <div className="card">
          <img src="https://picsum.photos/800/600" className="card-img-top post-image" alt="..."/>
          <div className="card-body">
            <div className="d-flex align-items-center">
              <div className="post-like me-3">
                <a href="#">
                  <i className="far fa-heart"></i>
                </a>
              <div className="post-comment me-3">
                <a href="#">
                  <i className="far fa-comment"></i>
                </a>
              </div>
              <div className="post-bookmark">
                <a href="#">
                  <i className="far fa-bookmark"></i>
                </a>
              </div>
            </div>
            <h5 className="card-title my-3">Título de la publicación</h5>
            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor nisi libero, nec dictum neque bibendum quis. Sed et sapien euismod, ornare libero et, euismod nibh. In hac habitasse platea dictumst.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
    </>
  )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(PaginaDeInicio);