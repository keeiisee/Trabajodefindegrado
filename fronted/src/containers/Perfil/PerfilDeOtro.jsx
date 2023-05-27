import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { OtroNavbarPerfil } from './OtroNavbarPerfil';

export const PerfilDeOtro = () => {
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

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [routeParams.id]);


    return (
        <>
            <OtroNavbarPerfil />
            <div className="sm:ml-64 mr-6">
                <div className="p-4 ml-6 sm:ml-14 border-4 nav-border bg-marron rounded-lg dark:border-gray-700">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="border-4 border-marron border-dashed flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <span className="badge bg-primary">Logros: {profile && profile[0].logros.length}</span>
                        </div>
                        <div className="border-4 flex border-black border-dashed items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <span className="badge bg-primary">Publicaciones: {profile && profile[0].amigos.length}</span>
                        </div>
                        <div className="border-4 border-marron border-dashed flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <span className="badge bg-primary">Amigos: {profile && profile[0].amigos.length}</span>
                        </div>
                    </div>

                    <div className="border-4 flex border-black border-dashed justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                        <p className="mt-3">Biografia: {profile && profile[0].descripcion}</p>
                    </div>


                    <div className="border-4 flex items-center border-marron border-dashed flex items-center justify-center rounded bg-gray-50 h-48 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">{profile.length > 0 ? profile[0].logros.map((logro, key) => {
                            return <li key={key} className="list-group-item" >{logro}</li>
                        }) : null}</p>

                    </div>

                </div>
            </div>

        </>
    )
}
export default PerfilDeOtro