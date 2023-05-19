import React, { useEffect, useState } from 'react';

import Navbar from '../../components/Navbar';
import { load_Idprofile } from '../../actions/auth';
import { connect } from 'react-redux';
import { crear_post } from '../../actions/post';
import { useNavigate } from 'react-router-dom';

function NewPostForm({ load_Idprofile, crear_post }) {
  const [descripcion, setDescripcion] = useState('');
  const [profile, setProfile] = useState('');
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    crear_post(descripcion, profile[0].id, '', '')
    navigate('/profile')
  };
  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };
  useEffect(() => {
    const fechData = async () => {
      const datosProfile = await load_Idprofile()
      setProfile(datosProfile)
    }
    fechData()
  }, [])

  return (
    <>
      <Navbar></Navbar>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción:</label>
          <textarea className="form-control" onChange={handleDescripcionChange} id="descripcion" name="descripcion" rows="3"></textarea>
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Guardar</button>
      </form>
    </>

  );
}

export default connect(null, { load_Idprofile, crear_post })(NewPostForm);