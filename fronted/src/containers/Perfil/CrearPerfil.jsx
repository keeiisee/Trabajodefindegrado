import { useState } from 'react';
import { connect } from 'react-redux';
import { crear_perfil } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';

function CrearPerfil( {crear_perfil, user} ) {
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();
  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    crear_perfil(descripcion, user)
    navigate('/profile')
  };

  return (
    <div>
      <h2>Crear perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="descripcion"
            rows="3"
            value={descripcion}
            onChange={handleDescripcionChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Crear perfil</button>
      </form>
    </div>
  );
}
const mapStateToProps = state => ({
    user: state.auth.user
  });

export default connect(mapStateToProps, {crear_perfil})(CrearPerfil);