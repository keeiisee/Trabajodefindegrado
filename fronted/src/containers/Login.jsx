import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '' 
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const navigate = useNavigate()
    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    };
  
    useEffect(() => {
        if (isAuthenticated) {
          navigate('/paginadeinicio');
        }
      }, [isAuthenticated, navigate]);

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="card p-3 w-50">
            <h1 className="text-center mb-4">Iniciar Sesión</h1>
            <form onSubmit={e => onSubmit(e)}>
              <div className="form-floating mb-3">
                <input
                  className='form-control'
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className="form-floating mb-3">
                <input
                   className='form-control'
                   type='password'
                   placeholder='Password'
                   name='password'
                   value={password}
                   onChange={e => onChange(e)}
                   minLength='6'
                   required
                />
              </div>
              <button type="submit" className="btn btn-primary d-block w-100">
                Iniciar Sesión
              </button>
              <p className="mt-3 text-center">¿No tienes cuenta? <Link to="/signup">Registrate aquí</Link></p>
              <p className='mt-3 text-center'>
                    Forgot your Password? <Link to='/reset-password'>Reset Password</Link>
                </p>
            </form>
          </div>
        </div>
      );
    };
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{ login })(Login);