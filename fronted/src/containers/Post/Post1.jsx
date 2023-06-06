import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { eliminar_post, modificar_post, post_like } from '../../actions/post';
import { CogIcon, HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { HeartIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
const Post1 = ({ imagen }) => {
  const [isOpenPM, setIsOpenPM] = useState(false)
  const dispatch = useDispatch()
  const [profile, setProfile] = useState(null)
  const [mismoUser, setMismoUser] = useState(false)
  const [meGusta, setMeGusta] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      };
      try {
        const responseProfile = await fetch(`https://trabajodefindegrado-production-1dd0.up.railway.app/accounts/profiles/profiles/${imagen.autor}/`, config);
        const dataProfile = await responseProfile.json();
        setProfile(dataProfile);
        const responseUser = await fetch(`https://trabajodefindegrado-production-1dd0.up.railway.app/accounts/profile/`, config);
        const dataUser = await responseUser.json()

        if (dataUser[0].user_id === dataProfile.user_id) {
          setMismoUser(true)
        } else if (imagen.like.includes(dataUser[0].id)) {
          setMeGusta(true)
        }

      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [imagen.autor]);

  function like() {
    dispatch(post_like(imagen.id, !meGusta))
    setMeGusta(!meGusta)
  }
  function openPostM() {
    setIsOpenPM(true)
  }
  function cancelar() {
    setIsOpenPM(false)
    setFormData({ ...formData, ["descripcion"]: imagen.descripcion })
  }
  function eliminarPost() {
    dispatch(eliminar_post(imagen.id))
    window.location.reload()
  }

  function modificarPu() {
    dispatch(modificar_post(imagen.id, descripcion))
    window.location.reload()
  }
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [formData, setFormData] = useState({
    descripcion: null
  });
  const { descripcion } = formData;
  useEffect(() => {
    const fechData = async () => {

      setFormData({ ...formData, ["descripcion"]: imagen.descripcion })
    }
    fechData()
  }, [])
  return (
    <motion.div
    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative h-64 w-full mb-4">
      <img
        src={imagen.imagen}
        alt={imagen.descripcion}
        className="w-full h-full max-w-full max-h-full object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
    <div className="flex-1 flex flex-col">
      <h2 className="text-xl font-semibold mb-2">
        {profile && profile.user_name} - {imagen.fecha_publicacion.substr(0, 10)}
      </h2>
      {!isOpenPM && <p className="leading-relaxed mb-3 flex-grow">{imagen.descripcion}</p>}
      {isOpenPM && (
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring focus:border-blue-300 flex-grow"
          id="descripcion"
          type="text"
          placeholder="Descripcion"
          name="descripcion"
          value={descripcion}
          onChange={(e) => onChange(e)}
          minLength="6"
          required
        />
      )}
      <div className="flex items-center justify-between">
        {!isOpenPM && !mismoUser ? (
          <button onClick={like} className="focus:outline-none">
          {meGusta ? (
              <HeartIconSolid className="w-6 h-6 text-red-500 transition-colors duration-300 ease-in-out animate-like" />
          ) : (
              <HeartIcon className="w-6 h-6 text-gray-500 transition-colors duration-300 ease-in-out hover:text-red-500" />
          )}
      </button>
        ) : mismoUser && !isOpenPM ? (
          <button onClick={openPostM} className="text-gray-500 flex items-center space-x-2 focus:outline-none">
            <CogIcon className="h-6 w-6" />
            <span>Configurar Imagen</span>
          </button>
        ) : null}
        {isOpenPM && (
          <>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              type="button"
              onClick={eliminarPost}
            >
              Eliminar Post
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
              type="button"
              onClick={cancelar}
            >
              Cancelar
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-green-300"
              type="submit"
              onClick={modificarPu}
            >
              Modificar Post
            </button>
          </>
        )}
      </div>
    </div>
  </motion.div>
);
}


export default Post1