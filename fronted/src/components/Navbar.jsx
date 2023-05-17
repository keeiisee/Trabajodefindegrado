import React, { useContext, useState } from 'react'
import { logout, load_personas } from '../actions/auth';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserContext } from '../provider/UserContext';

export const Navbar = ({ logout, load_personas }) => {
  const {palabras, setPalabras} = useContext(UserContext)
  
  function PalabrasList({ palabras }) {
    return (
      <div className="position-relative">
        <ul className="list-group position-absolute top-100 start-0">
          {palabras.map((palabra, index) => (
            <li className="list-group-item" key={index}>
              <Link to={`/perfil/${palabra.id}`}>{palabra.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const navigate = useNavigate()
  const [letras, setLetras] = useState('')
  const logout_user = () => {
    logout();
    navigate('/');
  };
  const onChange = async (e) => {
    setLetras(e.target.value);
    
    if (e.target.value !== ''){
      const personas = await load_personas(e.target.value);
      if (personas.length !== 0){
        setPalabras(personas)
      } else {
        setPalabras([]);
      }
      
    } else {
      setPalabras([])
    }
  }
 
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Calistenia</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/paginadeinicio">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Explorar
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pp">
                  Subir
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Perfil
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="" onClick={logout_user}>
                  Cerrar Sesion
                </a>
              </li>
            </ul>
            <form className="d-flex">
            <PalabrasList palabras={palabras} />
              <input
                className="form-control me-2"
                onChange={e => onChange(e)}
                type="search"
                placeholder="Buscar"
                aria-label="Buscar"
                value={letras}
              />
            </form> 
          </div>
        </div>
      </nav>
    </>
  );
}

export default connect(null, { logout, load_personas })(Navbar)