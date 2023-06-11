import React, { useContext, useEffect, useState } from 'react';
import { load_Idprofile } from '../../actions/auth';
import {  useDispatch } from 'react-redux';
import { crear_post } from '../../actions/post';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../provider/UserContext';

function NewPostForm({ setIsOpen, handleProfileUpdate }) {
  const dispatch = useDispatch();
  const { closePos } = useContext(UserContext);
  const [profile, setProfile] = useState('');
  const [formData, setFormData] = useState({
    descripcion: '',
    imagen: null,
  });
  const { descripcion, imagen } = formData;

  const onChange = (e) => {
    const { name, type, value, files } = e.target;
    setFormData({ ...formData, [name]: type === 'file' ? files[0] : value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(crear_post(descripcion, profile[0].id, imagen, ''));
    handleProfileUpdate()
    closePos();
    setIsOpen(false);
    
  };

  useEffect(() => {
    const fetchData = async () => {
      const datosProfile = await dispatch(load_Idprofile());
      setProfile(datosProfile);
    };
    fetchData();
  }, [dispatch]);

  return (
    
    <>
      <div
        className="fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
        id="loginModal"
      >
        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
          <h2 className="text-2xl font-semibold mb-4">Crear Post</h2>
          <form onSubmit={e => onSubmit(e)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Imagen
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="imagen"
                type="file"
                accept="image/*"
                name="imagen"
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                Descripcion
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="descripcion"
                type='text'
                placeholder='Descripcion'
                name='descripcion'
                value={descripcion}
                onChange={e => onChange(e)}
                minLength='6'
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={closePos}
              >
                Cancelar
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Crear Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewPostForm;