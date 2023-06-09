//registro con tailwind
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../provider/UserContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signup } from "../../actions/auth";
import { animated, useSpring } from 'react-spring';
const RegisterModal = ({ setNotification }) => {
  const [error1, setError1] = useState({ email: '', name: '' });
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const success = useSelector((state) => state.auth.success);
  const { closeReg } = useContext(UserContext);
  const [error, setError] = useState(''); 
  const [accountCreated, setAccountCreated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    re_password: '',
  });
  const navigate = useNavigate();
  const { name, email, password, re_password } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== re_password) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setIsSubmitting(true);
    dispatch(signup(name, email, password, re_password))
      .then(() => {
        setIsSubmitting(false);
        setNotification('Recibirás un correo de confirmación en breve.');
        closeReg();
      })
      .catch(() => {
        setIsSubmitting(false);
      });
  };
  useEffect(() => {
    if (success) {
      setAccountCreated(true);
      closeReg();
    }
  }, [success]);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (accountCreated) {
      navigate('/');
    }
  }, [accountCreated, navigate]);
  const erroresStatus = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (erroresStatus) {
      if (erroresStatus.email || erroresStatus.name) {
        setError1(erroresStatus);
      }
    }

  }, [erroresStatus]);
  const animation = useSpring({
    opacity: 1,
    transform: 'translate3d(0,0,0)',
    from: { opacity: 0, transform: 'translate3d(0,-50px,0)' },
    config: { duration: 200 },
  });

  return (
    <div className="relative">
      <div
        className="fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
        id="registerModal"
      >
        <animated.div
          className="bg-white rounded-lg shadow-lg w-96 p-6"
          style={animation}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-700">
            Registro
          </h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Correo electrónico
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
              {error1.email && (
                <p className="text-red-500 mt-2">{error1.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Nombre
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(e) => onChange(e)}
                required
              />
              {error1.name && (
                <p className="text-red-500 mt-2">{error1.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Contraseña"
                value={password}
                name="password"
                onChange={(e) => onChange(e)}
                minLength="6"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirmar contraseña
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="re_password"
                type="password"
                placeholder="Confirmar contraseña"
                name="re_password"
                value={re_password}
                onChange={(e) => onChange(e)}
                minLength="6"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 mb-4">{error}</p>
            )}
            <div className="flex items-center justify-between">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                type="button"
                onClick={closeReg}
              >
                Cancelar
              </button>
              <button
                disabled={isSubmitting}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {isSubmitting ? 'Enviando...' : 'Registrarse'}
              </button>
            </div>
          </form>
        </animated.div>
      </div>
    </div>
  );
};


export default RegisterModal;