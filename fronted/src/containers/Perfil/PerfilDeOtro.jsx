import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export const PerfilDeOtro = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const routeParams = useParams()
    
    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            };
            try {
                const responseProfile = await fetch(`http://localhost:8000/accounts/profile/${routeParams.id}/`, config);
                const dataProfile = await responseProfile.json();
                setProfile(dataProfile)
                const responseUser = await fetch(`http://localhost:8000/accounts/usuarios/${routeParams.id}/`, config);
                const dataUser = await responseUser.json()
                setUser(dataUser);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);
    return (
        <>
            <Navbar />
            <div className="container-fluid bg-primary py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <img src={profile && profile[0].imagen} alt="Foto de perfil" className="rounded-circle img-fluid" />
                        </div>
                        <div className="col-md-9">
                            <h1 className="text-light mb-0">{user && user.name}</h1>
                            <p className="text-light">{profile && profile[0].descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-8">
                        <h2 className="text-accent">Mi rutina de calistenia</h2>
                        <p className="text-black">En esta sección puedes describir tu rutina de entrenamiento de calistenia. Puedes incluir ejercicios, repeticiones, series, etc.</p>
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-accent">Estadísticas</h3>
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center bg-secondary">
                                Logros
                                <span className="badge bg-accent rounded-pill">{profile && profile[0].logros.length}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center bg-secondary">
                                Amigos
                                <span className="badge bg-accent rounded-pill">{profile && profile[0].amigos.length}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center bg-secondary">
                                Publicaciones
                                <span className="badge bg-accent rounded-pill">50</span>
                            </li>
                        </ul>
                    </div>
                </div>


                <hr />
                <h2 className="text-accent">Mis publicaciones</h2>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card bg-secondary">
                            <img src="https://via.placeholder.com/350x200" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title text-accent">Título de la publicación</h5>
                                <p className="card-text text-light">Descripción de la publicación.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card bg-secondary">
                            <img src="https://via.placeholder.com/350x200" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title text-accent">Título de la publicación</h5>
                                <p className="card-text text-light">Descripción de la publicación.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card bg-secondary">
                            <img src="https://via.placeholder.com/350x200" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title text-accent">Título de la publicación</h5>
                                <p className="card-text text-light">Descripción de la publicación.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
