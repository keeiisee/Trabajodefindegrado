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
    }, [routeParams.id]);
    return (
        <><aside id="default-sidebar" className="border-4 fixed top-55 left-8 z-40 w-64 h-50 col-md-2 " aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
           <ul className="space-y-2 font-medium">
           <div className="d-flex justify-content-center align-items-center flex-column my-3">
               <img  className="w-50 h-50 rounded" src="https://picsum.photos/800/600" alt="Foto de Perfil" width="150" />

             </div>
             <p className='d-flex justify-content-center align-items-center flex-column mt-4 mb-4'>{user.name}</p>
            
              <li>
                 <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">Amigos</span>
                 </a>
              </li>
              <li>
                 <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
                    <span  className="flex-1 ml-3 whitespace-nowrap">Publicaciones</span>
                 </a>
              </li>
           </ul>
        </div>
     </aside>
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
            {/* <div className="container-fluid vh-100 h-md-50">
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
            </div> */}

        </>
    )
}
export default PerfilDeOtro