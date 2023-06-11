import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crear_perfil } from '../../actions/auth';
import { motion } from 'framer-motion';
import ToggleButton from './ToggleButton';

function CrearPerfil({ onClose, handleProfileUpdate }) {
  const dispatch = useDispatch()
  const handleClickOutside = (e) => {
    if (e.target.classList.contains('overlay')) {
      onClose();
    }
  };
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
      .then(() => {
        handleProfileUpdate()
        onClose()
      })

  };


  const handleToggle = (state) => {
    setPrivateProfile(state);
  };

  return (
    <div className="overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50" onClick={handleClickOutside}>
      <div className="w-full max-w-xl mx-auto mt-5">
        <motion.div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-600">
            Crear Perfil
          </h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="imagen" className="block text-gray-700 font-bold mb-2">Imagen de perfil</label>
              <input id="profileImage"
                required
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
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                type="button"
                onClick={()=>{onClose()}}
              >
                Cerrar
              </button>
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
    </div>
  );
}


export default CrearPerfil;