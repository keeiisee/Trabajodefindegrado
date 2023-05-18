import { useState } from 'react';
import { connect } from 'react-redux';
import { crear_perfil } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function CrearPerfil({ crear_perfil, user }) {
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [logros, setLogros] = useState('');

  const navigate = useNavigate();
  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };
  function handleImagenChange(event) {
    setImagen(event.target.files[0].name);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    crear_perfil(imagen, descripcion, logros, user)
    navigate('/profile')
  };

  return (
    <div>
      <Navbar></Navbar>
      
      <div className="container py-5">
      <h1 className="mb-4">Crear Perfil</h1>
      <form action="#" method="POST" encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">Imagen:</label>
          <input type="file" className="form-control" onChange={handleImagenChange} id="imagen" name="imagen" />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción:</label>
          <textarea className="form-control" onChange={handleDescripcionChange}id="descripcion" name="descripcion" rows="3"></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Logros:</label>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="logros" id="si" value="si" />
            <label className="form-check-label" htmlFor="si">
              Si
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="logros" id="no" value="no" />
            <label className="form-check-label" htmlFor="no">
              No
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="logros" id="puede" value="puede" />
            <label className="form-check-label" htmlFor="puede">
              Puede
            </label>
          </div>
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Guardar</button>
      </form>
    </div>
    </div>
  );
}
const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { crear_perfil })(CrearPerfil);