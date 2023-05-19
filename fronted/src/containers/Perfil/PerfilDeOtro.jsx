import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';

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

                    <div className="col-12 col-md-2 bg-light border-end">
                        <div className="d-flex justify-content-center align-items-center flex-column my-3">
                            <img src="https://picsum.photos/800/600" className="img-fluid rounded-circle my-3" alt="Foto de perfil" width="150" />
                        </div>
                        <h3>{user && user.name}</h3>

                        <div className="d-flex flex-column mt-3">
                            <button className="btn btn-primary mb-2">Añadir como amigo</button>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <br />
                    <h2>Perfil de {user && user.name}</h2>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <span className="badge bg-primary">Logros: {profile && profile[0].logros.length}</span>
                            <span className="badge bg-primary">Publicaciones: {profile && profile[0].amigos.length}</span>
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
}
export default PerfilDeOtro