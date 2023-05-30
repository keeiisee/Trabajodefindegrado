import { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { crear_perfil } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function CrearPerfil() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user);
  const [logros, setLogros] = useState([]);
  const opcionesLogros = ['primer logro', 'segundo logro', 'tercer  logro']
  const navigate = useNavigate();

  // function handleLogrosChange(e) {
  //   const options = e.target.options;
  //   const selectedValues = [];
  //   for (let i = 0; i < options.length; i++) {
  //     if (options[i].selected) {
  //       selectedValues.push(options[i].value);
  //     }
  //   }
  //   setLogros(selectedValues);
  // }
  const onChange = e => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(crear_perfil(imagen, descripcion, logros, user))
    navigate('/paginadeinicio')
  };
  const [formData, setFormData] = useState({
    descripcion: '',
    imagen: null
  });
  const { descripcion, imagen } = formData;

  return (
    <div>
      <div className="container py-5">
        <h1 className="mb-4">Crear Perfil</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">Imagen:</label>
            <input id="imagen"
                type="file"
                accept="image/*"
                name="imagen" className="form-control" onChange={(e) => onChange(e)} />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Biografía:</label>
            <textarea className="form-control" onChange={(e) => onChange(e)} id="descripcion" name="descripcion" rows="3"></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Logros:</label>
            <select className="form-select" onChange={(e) => onChange(e)}name="logros" multiple>
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


export default CrearPerfil;