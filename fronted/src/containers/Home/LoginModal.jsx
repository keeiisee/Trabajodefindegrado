//Login con tailwind
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../provider/UserContext'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../actions/auth';

export const LoginModal = () => {
    const { closeLog } = useContext(UserContext)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const navigate = useNavigate()
    const onSubmit = e => {
        e.preventDefault();

        dispatch(login(email, password));;
    };

    useEffect(() => {

        if (isAuthenticated) {
            navigate('/paginadeinicio');
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <div
                className="fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
                id="loginModal"
            >
                <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                    <h2 className="text-2xl font-semibold mb-4">Iniciar sesión</h2>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="appearancenone border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type='email'
                                placeholder='Email'
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
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
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type='password'
                                placeholder='Password'
                                name='password'
                                value={password}
                                onChange={e => onChange(e)}
                                minLength='6'
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={closeLog}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Iniciar sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
