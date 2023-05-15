import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="border p-5">
            <h1 className="text-center mb-4">Bienvenido</h1>
            <div className="d-flex justify-content-center">
            <Link className="btn btn-primary me-3" to='/login' role='button'>Login</Link>
            <Link className="btn btn-success" to='/signup' role='button'>Registrarte</Link>
            
            </div>
        </div>
      </div>
      );
}
export default Home

