import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Navbarperfil from './Navbarperfil';

export const PerfilDeOtro = () => {
    const [user, setUser] = useState("");
    const [profile, setProfile] = useState("");
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
            <div className="container-fluid vh-100 h-md-50">
                <div className="row h-100">
                    <div className="col-md-8">
                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <h2>Perfil de {user && user.name}</h2>
                            <span className="badge bg-primary">Logros: {profile && profile[0].logros.length}</span>
                            <span className="badge bg-primary">Amigos: {profile && profile[0].amigos.length}</span>
                        </div>
                        <label htmlFor="bio">Biografia</label>
                        <p className="mt-3">{profile && profile[0].descripcion}</p>
                        <h4 className="mt-4">Logros:</h4>
                        <ul className="list-group">
                            {profile && profile[0].logros.map((logro, key) => {
                                return <li key={key} className="list-group-item" >{logro}</li>
                            })}
                        </ul>
                        <button>Añadir como amigo</button>
                    </div>
                </div>
            </div>
        </>
    )
}
