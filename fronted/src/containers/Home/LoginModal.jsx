//Login con tailwind
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../provider/UserContext'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, reset_password } from '../../actions/auth';
import { motion } from 'framer-motion';

export const LoginModal = () => {
  const dispatch = useDispatch();
  const { closeLog } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [esResetPass, setEsResetPass] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const error = useSelector((state) => state.auth.error);
  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const onCancel = () => {
    dispatch({ type: 'CLEAR_ERROR' });
    closeLog();
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    if(esResetPass){
      setIsSubmitting(true);
      dispatch(reset_password(email))
        .then(() => {
          setIsSubmitting(false);
          closeLog();
        })
        .catch(() => {
          setIsSubmitting(false);
        });
    } else if (!esResetPass){
      dispatch(login(email, password));
    }
    
  };

  useEffect(() => {
    if (isAuthenticated) {
      closeLog();
      navigate('/paginadeinicio');
    }
  }, [isAuthenticated, navigate, closeLog]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        ease: 'easeInOut',
      },
    },
  };

  return (
    <>
      <div
        className="fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
        id="loginModal"
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg w-96 p-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {esResetPass &&
            <>
              <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-600">
                Restablecer contraseña
              </h2>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
                    id="email"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <div className="text-right mt-3">
                    <Link
                      onClick={() => setEsResetPass(false)}
                      className="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      Iniciar Sesion
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                    type="button"
                    onClick={onCancel}
                  >
                    Cancelar
                  </button>
                  <button
                disabled={isSubmitting}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>
                </div>
              </form>
            </>
          }
          {!esResetPass &&
            <>
              <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-600">
                Iniciar sesión
              </h2>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
                    id="email"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                  <input
                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
                    id="password"
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <div className="text-right mt-3">
                    <Link
                      onClick={() => setEsResetPass(true)}
                      className="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      ¿Olvidaste tu contraseña? Restablecer
                    </Link>
                  </div>
                </div>

                {errorMessage && (
                  <div className="bg-yellow-500 text-white px-4 py-2 mb-6 rounded">
                    {errorMessage}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                    type="button"
                    onClick={onCancel}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                    type="submit"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </form>
            </>
          }

        </motion.div>
      </div>
    </>
  );
};
