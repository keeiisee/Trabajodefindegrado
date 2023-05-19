import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom';
import Navbarperfil from './Navbarperfil';
import { connect } from 'react-redux';

export const ConPerfil = ({user}) => {
  const [profile, setProfile] = useState("");
  const [post, setPost] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
      };
      try {
        const responseProfile = await fetch('http://localhost:8000/accounts/profile/', config);
        const dataProfile = await responseProfile.json();
        setProfile(dataProfile)
        if (dataProfile){
          const responsePost = await fetch(`http://localhost:8000/accounts/publicaciones/${dataProfile[0].id}/`, config);
          const dataPost = await responsePost.json()
          setPost(dataPost)
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);
  const url = useMemo(() => {
    if (profile) {
        return profile[0].imagen;
    }
    return '';
}, [profile]);

  return (
    <>
      <Navbar />
      <div className="container-fluid vh-100 h-md-50">
        <div className="row h-100">
          <Navbarperfil imagen={url}/>
          <div className="col-md-8">
            <br />
          <h2 >Perfil de {user.name}</h2>
            <div className="d-flex justify-content-between align-items-center mt-3">
              
              <span className="badge bg-primary">Logros: {profile && profile[0].logros.length}</span>
              <span className="badge bg-primary">Publicaciones: {post.length}</span>
              <span className="badge bg-primary">Amigos: {profile && profile[0].amigos.length}</span>
            </div>
            <br />
            <label htmlFor="bio" className="form-label">Biografía:</label>
            <div className="card">
              <div className="card-body">

                <p className="mt-3">{profile && profile[0].descripcion}</p>
              </div>
            </div>
            <h4 className="mt-4">Logros:</h4>
            <ul className="list-group">
              {profile && profile[0].logros.map((logro, key) => {
                return <li key={key} className="list-group-item" >{logro}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
};
const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(mapStateToProps)(ConPerfil)