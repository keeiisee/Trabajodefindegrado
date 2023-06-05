import { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { crear_perfil } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ToggleButton from '../probar/ToggleButton';

function CrearPerfil() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const [formData, setFormData] = useState({
    profileImage: null,
    description: '',
    phone: '',
    age: '',
  });
  const [privateProfile, setPrivateProfile] = useState(false);
  const { profileImage, description, phone, age } = formData;

  const onChange = (e) => {
    if (e.target.name === 'profileImage') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(crear_perfil(profileImage, description, phone, user, age, privateProfile))
    navigate('/paginadeinicio')
    // Enviar los datos del formulario
  };


  const handleToggle = (state) => {
    setPrivateProfile(state);
  };




  

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

  return (
    <div className="w-full max-w-xl mx-auto mt-5">
      <motion.div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-600">
          Crear Perfil
        </h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="imagen" className="block text-gray-700 font-bold mb-2">Imagen de perfil</label>
            <input id="profileImage"
              type="file"
              accept="image/*"
              name="profileImage" className="form-control" onChange={(e) => onChange(e)} />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Descripcion
            </label>
            <textarea
             required
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
              id="description"
              placeholder="Descripción"
              name="description"
              value={description}
              onChange={(e) => onChange(e)}
              rows={4}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phone"
            >
              Teléfono
            </label>
            <input
            required
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
              id="phone"
              type="tel"
              placeholder="Teléfono"
              maxLength={9}
              name="phone"
              value={phone}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="age"
            >
              Edad
            </label>
            <input
            required
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
              id="age"
              type="number"
              placeholder="Edad"
              name="age"
              value={age}
              onChange={(e) => onChange(e)}
            />
          </div>
          <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="perfil"
            >
              Perfil Privado
            </label>
          <div className="mb-4">
            <ToggleButton
              initialState={privateProfile}
              onToggle={handleToggle}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
              type="submit"
            >
              Guardar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
    // <div>
    //   <div className="container py-5">
    //     <h1 className="mb-4">Crear Perfil</h1>
    //     <form>
    // <div className="mb-3">
    //   <label htmlFor="imagen" className="form-label">Imagen:</label>
    //   <input id="imagen"
    //       type="file"
    //       accept="image/*"
    //       name="imagen" className="form-control" onChange={(e) => onChange(e)} />
    // </div>
    //       <div className="mb-3">
    //         <label htmlFor="descripcion" className="form-label">Biografía:</label>
    //         <textarea className="form-control" onChange={(e) => onChange(e)} id="descripcion" name="descripcion" rows="3"></textarea>
    //       </div>
    //       <div className="mb-3">
    //         <label className="form-label">Logros:</label>
    //         <select className="form-select" onChange={(e) => onChange(e)}name="logros" multiple>
    //           {opcionesLogros && opcionesLogros.map((logro, key) => (
    //             <option key={key} value={logro}>{logro}</option>
    //           ))}
    //         </select>
    //       </div>
    //       <button type="submit" onClick={handleSubmit} className="btn btn-primary">Guardar</button>
    //     </form>
    //   </div>
    // </div>
  );
}


export default CrearPerfil;