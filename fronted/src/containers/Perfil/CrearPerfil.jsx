import { useState } from 'react';
import { connect } from 'react-redux';
import { crear_perfil } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function CrearPerfil({ crear_perfil, user }) {
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [logros, setLogros] = useState([]);
  const opcionesLogros = ['primer logro', 'segundo logro', 'tercer  logro']
  const navigate = useNavigate();

  function handleLogrosChange(e) {
    const options = e.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setLogros(selectedValues);
  }

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  function handleImagenChange(event) {
    setImagen(event.target.files[0].name);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    crear_perfil(imagen, descripcion, logros, user)
    navigate('/paginadeinicio')
  };

  return (
    <div>
      <div className="container py-5">
        <h1 className="mb-4">Crear Perfil</h1>
        <form action="#" method="POST" encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">Imagen:</label>
            <input type="file" className="form-control" onChange={handleImagenChange} id="imagen" name="imagen" />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Biografía:</label>
            <textarea className="form-control" onChange={handleDescripcionChange} id="descripcion" name="descripcion" rows="3"></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Logros:</label>
            <select className="form-select" onChange={handleLogrosChange} name="logros" multiple>
              {opcionesLogros && opcionesLogros.map((logro, key) => (
                <option key={key} value={logro}>{logro}</option>
              ))}
            </select>
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