import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';
import { useParams } from "react-router-dom"
import { motion } from 'framer-motion';

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({ new_password: '', re_new_password: '' });
    const routeParams = useParams()
    const { new_password, re_new_password } = formData;
    const [errorMessage, setErrorMessage] = useState('');
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (new_password !== re_new_password) {
            setErrorMessage('Las contraseñas deben ser iguales');
            return;
        }
        const uid = routeParams.uid
        const token = routeParams.token
        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    const navigate = useNavigate()

    useEffect(() => {
        if (requestSent) {
            navigate('/');
        }
    }, [requestSent, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600">
            <motion.div
                className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >

                <div className="max-w-md w-full space-y-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Restablecer contraseña
                        </h2>
                    </div>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="new_password"
                            >
                                Nueva contraseña
                            </label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
                                id="new_password"
                                type="password"
                                placeholder="Nueva contraseña"
                                name="new_password"
                                value={new_password}
                                onChange={(e) => onChange(e)}
                                minLength="6"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="re_new_password"
                            >
                                Confirmar nueva contraseña
                            </label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
                                id="re_new_password"
                                type="password"
                                placeholder="Confirmar nueva contraseña"
                                name="re_new_password"
                                value={re_new_password}
                                onChange={(e) => onChange(e)}
                                minLength="6"
                                required
                            />
                            {errorMessage && (
                                <div className="text-red-600 mt-4 text-center">{errorMessage}</div>
                            )}
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Restablecer contraseña
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};


export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);