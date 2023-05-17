import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <section className="bg-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="text-black mb-4">Iniciar sesión</h2>

            <form onSubmit={e => onSubmit(e)}>
              <div className="form-group">
                <input
                  className='form-control form-control-lg'
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  className='form-control form-control-lg'
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={e => onChange(e)}
                  minLength='6'
                  required
                />
              </div>
              <br />
              <button type="submit" className="btn btn-primary d-block w-100">
                Iniciar Sesión
              </button>
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

export default connect(mapStateToProps, { login })(Login);