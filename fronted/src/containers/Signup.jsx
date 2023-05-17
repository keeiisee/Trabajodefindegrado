import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import { UserContext } from '../provider/UserContext';

const Signup = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: ''
    });
    const { setSeccion } = useContext(UserContext)
    const { name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const navigate = useNavigate()
    const onSubmit = e => {
        e.preventDefault();
        if (password === re_password) {
            signup(name, email, password, re_password);
            setAccountCreated(true);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (accountCreated) {
            setSeccion('dos')
            navigate('/');
        }
    }, [accountCreated, navigate]);

    return (
        <section className="bg-light py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="text-black mb-4">Registrarse</h2>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type='text'
                                    placeholder='Name*'
                                    name='name'
                                    value={name}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                            <br />
                            <div className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type='email'
                                    placeholder='Email*'
                                    name='email'
                                    value={email}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                            <br />
                            <div className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type='password'
                                    placeholder='Password*'
                                    name='password'
                                    value={password}
                                    onChange={e => onChange(e)}
                                    minLength='6'
                                    required
                                />
                            </div>
                            <br />
                            <div className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type='password'
                                    placeholder='Confirm Password*'
                                    name='re_password'
                                    value={re_password}
                                    onChange={e => onChange(e)}
                                    minLength='6'
                                    required
                                />
                            </div>
                            <br />
                            <button className='btn btn-primary col-md-12' type='submit'>Register</button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <br />
                        <img src="https://picsum.photos/800/600" alt="" className="img-fluid" />
                    </div>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);